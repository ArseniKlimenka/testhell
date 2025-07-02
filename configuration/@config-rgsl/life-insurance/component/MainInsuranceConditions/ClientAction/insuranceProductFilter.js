'use strict';

const { getInsuranceProductFilter } = require('@config-rgsl/life-insurance/lib/uiHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { portfolioMovementAmendmentDocuments } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function insuranceProductFilter(input, ambientProperties) {

    const currentPartner = input.context.Body.mainInsuranceConditions.partner?.partnerCode;

    if (!currentPartner) {

        return [];
    }

    const body = input?.context?.Body;

    let productGroup = input?.context?.Dimensions?.productGroup;
    const productGroupCollectivePolicy = body?.mainInsuranceConditions?.insuranceProduct?.productGroup;
    let issueDate = body?.basicConditions?.issueDate;
    if (portfolioMovementAmendmentDocuments.includes(ambientProperties.configurationCodeName)) {
        if (body?.amendmentData?.portfolioMovementAmendmentData?.mainAttributes?.productConfOnAmendmentDate) {
            issueDate = body?.amendmentData?.portfolioMovementAmendmentData?.mainAttributes?.amendmentIssueDate;
        }
        else {
            issueDate = body?.amendmentData?.portfolioMovementAmendmentData?.mainAttributes?.amendmentEffectiveDate;
        }
    }
    const partnerBusinessCode = body?.mainInsuranceConditions?.partner?.partnerBusinessCode;
    const createdFromPolicy = body?.technicalInformation?.createdFromPolicy;

    if (productGroup == lifeInsuranceConstants.productGroupCollective.Name && productGroupCollectivePolicy) {
        productGroup = productGroupCollectivePolicy;
    }

    const notification = {
        message: '',
        firstNullResult: false
    };

    const result = getInsuranceProductFilter(ambientProperties, input.items, productGroup, partnerBusinessCode, issueDate, createdFromPolicy, notification);

    if (result?.length == 0) {
        this.view.getControlByElementId('insuranceProductId').clear();
        ambientProperties.services.confirmationDialog.showNotification(notification.message, 'OK', 'Cancel', 1);
    }

    return result;

};
