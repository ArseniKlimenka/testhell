'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {
    if (input.paymentOrderType !== paymentOrderType.Commission) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    serviceProviderCode: sinkExchange.commissionActData.aaServiceProviderCode,
                }
            }
        }
    };
};
