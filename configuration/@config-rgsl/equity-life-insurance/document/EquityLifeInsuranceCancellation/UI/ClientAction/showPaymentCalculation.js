const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function showPaymentCalculation(input, ambientProperties) {

    const body = input.context.Body;
    const isByClientNonCoolOff = body.basicAmendmentConditions.amendmentReason === amendmentConstants.amendmentReason.byClientNonCoolOff;

    return isByClientNonCoolOff;
};
