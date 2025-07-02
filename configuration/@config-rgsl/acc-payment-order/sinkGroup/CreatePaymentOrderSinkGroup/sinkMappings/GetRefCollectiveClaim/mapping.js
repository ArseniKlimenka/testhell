'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");
const { paymentOrderSubType } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');

module.exports = function mapping(input, sinkExchange) {

    // This sink is executed only in case when paymentOrderType = Claim and subtype = collective
    const type = input.paymentOrderType;
    const subType = input.paymentOrderSubtype;
    const isCollectiveClaim = type === paymentOrderType.Claim && subType === paymentOrderSubType.Collective;

    if (!isCollectiveClaim) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    documentNumber: input.referenceNumber
                }
            }
        }
    };
};
