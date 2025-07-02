'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");
const { paymentOrderSubType } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');

module.exports = function mapping(input, sinkExchange) {

    // This sink is executed only in case when paymentOrderType = Claim

    if (input.paymentOrderType !== paymentOrderType.Claim || !!input.paymentOrderSubtype) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    documentNumber: input.referenceNumber,
                    beneficiaryCode: input.beneficiaryCode
                }
            }
        }
    };
};
