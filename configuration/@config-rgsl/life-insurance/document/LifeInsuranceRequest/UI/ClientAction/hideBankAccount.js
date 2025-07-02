const { typeOfRequest } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideBankAccount(input) {

    const body = input.context.Body;
    const isModificationTypeRequest = body.typeOfRequest === typeOfRequest.Modification;
    const productGroup = body.contract.productGroup;
    const isEquityProductGroup = productGroup === lifeInsuranceConstants.productGroup.DSZ.descriptionRU;

    return isModificationTypeRequest && isEquityProductGroup;
};
