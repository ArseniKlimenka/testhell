'use strict';

const { calculateClaimAmounts } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function mapping({ input, sinkExchange }) {

    const exchangeRate = sinkExchange.currentExchangeRate ?? 1;
    const existingPaymentOrders = sinkExchange.foundPaymentOrders ?? [];
    const investProfitRates = sinkExchange.allocatedItems ?? [];

    input.body.claimAmounts.exchangeRate = exchangeRate;
    calculateClaimAmounts(input.body, input.claimState, investProfitRates, existingPaymentOrders);

    if (input.commonBody) {

        input.commonBody.attributes.claimAmounts = input.body.claimAmounts;
        input.commonBody.attributes.claimBeneficiaries = input.body.claimBeneficiaries;
    }

    const successResponse = {
        body: input.body,
        commonBody: input.commonBody
    };

    return successResponse;
};
