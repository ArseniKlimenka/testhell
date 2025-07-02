const { typeOfRequest } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function showPaymentCalculation(input, ambientProperties) {

    const body = input.context.Body;
    const productGroup = body.contract.productGroup;
    const isEquityProductGroup = productGroup === lifeInsuranceConstants.productGroup.DSZ.descriptionRU;
    const isCancelTypeRequest = body.typeOfRequest === typeOfRequest.Cancellation;
    const isByClientNonCoolOff = body.amendmentReason === amendmentConstants.amendmentReason.byClientNonCoolOff;

    const showSignatureForm = isEquityProductGroup && isCancelTypeRequest && isByClientNonCoolOff;

    return showSignatureForm;
};
