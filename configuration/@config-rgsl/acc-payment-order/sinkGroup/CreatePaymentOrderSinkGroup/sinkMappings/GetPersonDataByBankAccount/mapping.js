'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {
    // This sink is executed only in case when paymentOrderType = PaymentRefund
    const debtorAccountNo = sinkExchange.paymentData?.debtorAccountNo;
    if (input.paymentOrderType !== paymentOrderType.PaymentRefund || !debtorAccountNo) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    partyBankAccount: debtorAccountNo,
                }
            }
        }
    };
};
