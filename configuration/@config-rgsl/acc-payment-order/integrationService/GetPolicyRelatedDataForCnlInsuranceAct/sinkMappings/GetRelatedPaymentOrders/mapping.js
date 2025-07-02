'use strict';

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input) {

    const output = {
        input: {
            data: {
                criteria: {
                    recipientPartyCode: input.recipientPartyCode,
                    paymentOrderType: paymentOrderType.Claim,
                    paymentOrderSubType: paymentOrderSubType.Endowment,
                    contractNumber: input.contractNumber,
                    onlyPaid: true
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };

    return output;
};
