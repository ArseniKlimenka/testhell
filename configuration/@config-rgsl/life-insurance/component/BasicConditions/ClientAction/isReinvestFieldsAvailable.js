'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function isReinvestFieldsAvailable(input) {

    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate;

    const isReinvestChecked = input.componentContext.isReinvest;
    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isEPolicy = issueFormCode == 'ePolicy';
    const isReinvest = lifeInsuranceConstants.productGroupArray.REINVEST.includes(productCode);

    if (!productCode || !issueDate || (isEPolicy && !isReinvest) || !isReinvestChecked) {
        return false;
    }

    const isReinvestAvailable = body?.productConfiguration?.isReinvestAvailable || false;

    if (!isReinvestAvailable) {
        return false;
    }

    const isReinvestFieldsAvailable = body?.productConfiguration?.isReinvestFieldsAvailable || false;

    return isReinvestFieldsAvailable;

};
