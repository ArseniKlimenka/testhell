const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function mapping(policyBody, commonBody) {

    const amendmentBody = amendmentUtils.getDefaultCancellationBody(this, policyBody.policyHolder);
    amendmentBody.paymentAmendmentConditions.fixedExchangeRate = policyBody.basicConditions.exchangeRate;
    amendmentBody.paymentAmendmentConditions.useFixedExchangeRate = !!policyBody.basicConditions.exchangeRate;
    return { body: amendmentBody };
};
