'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { mapRequest } = require('@config-rgsl/life-insurance/lib/inquiriesHelper');
module.exports = async function createInquiry(input, ambientProperties) {

    if (!input.context.ClientViewModel?.inquiriesData?.department ||
        (!input.context.ClientViewModel?.inquiriesData?.textOfInquiry &&
            input.context.ClientViewModel?.inquiriesData?.inquiryReasons?.filter(i => i.description == 'Иное').length > 0)) {

        const notificationMessage = 'Необходимо указать подразделение и текст запроса!';
        ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
        return;
    }

    const createInspectionRequest = mapRequest(input, ambientProperties);
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

    await this.view.evaluate(['/tempTechnicalData/inquiries[SetAmendmentInquiries]'], false, true);

    if (!isDirtyInitially) {

        this.view.setClean();
    }

    that.view.stopBlockingUI();
    that.view.rebind();
    that.view.reevaluateRules();
    that.view.validate();
};
