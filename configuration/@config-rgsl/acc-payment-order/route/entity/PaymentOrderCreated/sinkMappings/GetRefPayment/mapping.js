'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input) {

    const poInfo = input.body.paymentOrderInformation;

    // This sink is executed only in case when paymentOrderType = PaymentRefund
    if (poInfo.paymentOrderType !== paymentOrderType.PaymentRefund) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    bankStatementItemId: parseInt(poInfo.referenceNumber),
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
