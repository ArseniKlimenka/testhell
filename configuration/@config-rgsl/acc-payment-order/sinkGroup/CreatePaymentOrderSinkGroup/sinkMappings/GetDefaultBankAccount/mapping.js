'use strict';

const { defaultBankAccount } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mappingFunction(input) {
    return {
        input: {
            data: {
                criteria: {
                    incomeSourceId: defaultBankAccount.incomeSourceId,
                    paymentSourceId: defaultBankAccount.paymentSourceId,
                    isTop1: true
                }
            }
        }
    };
};
