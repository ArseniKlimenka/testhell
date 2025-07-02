'use strict';

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mappingFunction(input) {

    const type = input.paymentOrderType;
    const subType = input.paymentOrderSubtype;
    const isClaim = type === paymentOrderType.Claim && !subType;
    const isCollectiveClaim = type === paymentOrderType.Claim && subType === paymentOrderSubType.Collective;


    if (!isClaim && !isCollectiveClaim) {

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
