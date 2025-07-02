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

    const createInquiryRequest = {
        method: 'post',
        url: 'api/core/public/universal-documents/EndowmentInquiry/1/',
        data: {
            data: {
                department: input.context.ClientViewModel.inquiriesData.department,
                inquiryReasons: input.context.ClientViewModel.inquiriesData.inquiryReasons,
                textOfInquiry: input.context.ClientViewModel.inquiriesData.textOfInquiry,
                endowmentNumber: input.rootContext.Number,
                endowmentId: input.rootContext.Id,
                creatorUserName: ambientProperties.applicationContext.currentUser().getUserName(),
                holder: input.rootContext.Body.technicalData?.policyInfo?.policyHolder?.name,
                contractNumber: input.rootContext.Body.mainAttributes?.contract?.number,
                contractConfigurationCodeName: input.rootContext.Body.mainAttributes?.contract?.configurationName
            }
        },
        callContext: {
            workUnitActorCode: 'InquiryManager'
        },
        returnFullResponse: true
    };

    const isDirtyInitially = this.view.isDirty();

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(createInquiryRequest);
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
    await this.view.evaluate(['[SetEndowmentInquiries]'], false, true);

    if (!isDirtyInitially) {

        this.view.setClean();
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
