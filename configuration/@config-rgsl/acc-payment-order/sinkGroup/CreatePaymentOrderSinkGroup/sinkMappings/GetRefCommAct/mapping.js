'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input) {

    // This sink is executed only in case when paymentOrderType = Commission
    if (input.paymentOrderType !== paymentOrderType.Commission) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    actId: input.commissionActId
                }
            }
        }
    };
};
