"use strict";

const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(input, sinkExchange) {

    const data = sinkExchange.resolveContext('act');

    if (data.commAmountLc > 0) {
        const request = {
            paymentOrderType: paymentOrderType.Commission,
            referenceNumber: input.number,
            commissionActId: data.actId,
        };

        return {
            integrationConfigurationName: 'CreatePaymentOrder',
            integrationConfigurationVersion: '1',
            input: request,
        };
    }
};
