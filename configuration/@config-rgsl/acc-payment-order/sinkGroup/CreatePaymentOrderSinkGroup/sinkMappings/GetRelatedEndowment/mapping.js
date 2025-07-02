'use strict';

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function fetchMapping(input, sinkExchange) {

    const type = input.paymentOrderType;
    const subType = input.paymentOrderSubtype;
    const number = input.referenceNumber;
    const shouldUpdate = input.shoudlUpdateRefDoc;

    if (type !== paymentOrderType.Claim || subType !== paymentOrderSubType.Endowment || !shouldUpdate) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    endowmentNumber: number
                }
            }
        }
    };
};
