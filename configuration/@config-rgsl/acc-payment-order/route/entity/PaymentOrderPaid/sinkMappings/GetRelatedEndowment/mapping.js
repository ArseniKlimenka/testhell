'use strict';

const { paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function fetchMapping(input, sinkExchange) {

    const subType = input.body.paymentOrderInformation.paymentOrderSubType;
    const endowmentNumber = input.body.paymentOrderInformation.referenceNumber;

    if (subType !== paymentOrderSubType.Endowment) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    endowmentNumber: endowmentNumber
                }
            }
        }
    };
};
