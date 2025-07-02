'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.integrationServiceInput = input;

    // This sink is executed only in case when paymentOrderType = PaymentRefund
    if (input.paymentOrderType !== paymentOrderType.PaymentRefund) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    bankStatementItemId: parseInt(input.referenceNumber)
                }
            }
        }
    };
};
