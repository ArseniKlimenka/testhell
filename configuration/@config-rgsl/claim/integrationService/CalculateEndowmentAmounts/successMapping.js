'use strict';

const { calculateEndowmentAmounts } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function mapping({ input, sinkExchange }) {

    const installements = sinkExchange.foundInstallements ?? [];
    const investProfitRates = sinkExchange.allocatedItems ?? [];
    const partiesData = sinkExchange.foundPartiesData ?? [];
    const exchangeRate = sinkExchange.currentExchangeRate ?? 1;
    const existingPaymentOrders = sinkExchange.foundPaymentOrders ?? [];
    const previousEndowmentPayments = sinkExchange.foundPreviousPayments ?? [];

    input.body.endowmentAmounts.exchangeRate = exchangeRate;

    calculateEndowmentAmounts(input.body, previousEndowmentPayments, existingPaymentOrders, installements, investProfitRates, partiesData, input.endowmentState);

    if (input.commonBody) {

        input.commonBody.attributes.endowmentAmounts = input.body.endowmentAmounts;
        input.commonBody.attributes.endowmentBeneficiaries = input.body.endowmentBeneficiaries;
    }

    const successResponse = {
        body: input.body,
        commonBody: input.commonBody
    };

    return successResponse;
};
