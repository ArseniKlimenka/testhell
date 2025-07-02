'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {

    // This sink is executed only in case when paymentOrderType = Commission
    if (input.paymentOrderType !== paymentOrderType.Commission || !sinkExchange.commissionActData || !sinkExchange.commissionActData.aaNumber) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    documentNumber: sinkExchange.commissionActData.aaNumber
                }
            }
        }
    };
};
