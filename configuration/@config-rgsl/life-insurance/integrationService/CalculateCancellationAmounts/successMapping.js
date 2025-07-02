'use strict';

const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function mapping({input, sinkExchange}) {

    const installements = sinkExchange.foundInstallements ?? [];
    const investProfitRates = sinkExchange.allocatedItems ?? [];
    const exchangeRate = sinkExchange.currentExchangeRate ?? 1;
    const existingPaymentOrders = sinkExchange.FoundPaymentOrders ?? [];
    const partiesData = sinkExchange.foundPartiesData ?? [];
    const stateBody = sinkExchange.contractStateBody;
    const policyData = {
        startDate: stateBody.policyTerms.startDate,
        endDate: stateBody.policyTerms.endDate,
        issueDate: stateBody.basicConditions.issueDate,
        currencyCode: stateBody.basicConditions.currency.currencyCode
    };

    input.body.paymentAmendmentConditions.exchangeRate = exchangeRate;
    amendmentUtils.calculateCancellationAmounts(input.body, installements, investProfitRates, partiesData, policyData, existingPaymentOrders, input.amendmentState);

    const successResponse = {
        body: input.body
    };

    return successResponse;
};
