'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function createInquiry(input, ambientProperties) {

    if (!input.context.ClientViewModel?.inquiriesData?.department ||
        (!input.context.ClientViewModel?.inquiriesData?.textOfInquiry &&
            input.context.ClientViewModel?.inquiriesData?.inquiryReasons?.filter(i => i.description == 'Иное').length > 0)) {

        const notificationMessage = 'Необходимо указать подразделение и текст запроса!';
        ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
        return;
    }

    const createInspectionRequest = {
        method: 'post',
        url: 'api/core/public/universal-documents/CancellationInquiry/1/',
        data: {
            data: {
                configurationCodeName: input.rootContext.ConfigurationCodeName,
                department: input.context.ClientViewModel.inquiriesData.department,
                inquiryReasons: input.context.ClientViewModel.inquiriesData.inquiryReasons,
                textOfInquiry: input.context.ClientViewModel.inquiriesData.textOfInquiry,
                cancellationNumber: input.rootContext.Number,
                cancellationId: input.rootContext.Id,
                creatorUserName: ambientProperties.applicationContext.currentUser().getUserName(),
                holder: input.rootContext.Body.technicalData?.policyParties?.holder?.fullName,
                contractNumber: input.rootContext.OriginalDocumentNumber,
                contractConfigurationCodeName: input.rootContext.OriginalConfigurationCodeName
            }
        },
        callContext: {
            workUnitActorCode: 'InquiryManager'
        },
        returnFullResponse: true
    };

    const that = this;
    const isDirtyInitially = this.view.isDirty();


    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(createInspectionRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    input.context.ClientViewModel.inquiriesData.textOfInquiry = undefined;
    input.context.ClientViewModel.inquiriesData.department = undefined;
    input.context.ClientViewModel.inquiriesData.inquiryReasons = [];

    if (!input.rootContext.Body.tempTechnicalData) {

        input.rootContext.Body.tempTechnicalData = [];
    }

    input.rootContext.Body.tempTechnicalData.inquiries = [];
    await this.view.evaluate(['/tempTechnicalData/inquiries[SetCancellationInquiries]'], false, true);

    if (!isDirtyInitially) {

        this.view.setClean();
    }

    that.view.stopBlockingUI();
    that.view.rebind();
    that.view.reevaluateRules();
    that.view.validate();
};
