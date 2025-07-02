'use strict';

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function fetchMapping(input, sinkExchange) {

    const type = input.paymentOrderType;
    const subType = input.paymentOrderSubtype;
    const claimNumber = input.referenceNumber;
    const shouldUpdate = input.shoudlUpdateRefDoc;

    const isClaim = type === paymentOrderType.Claim && !subType;
    const isCollectiveClaim = type === paymentOrderType.Claim && subType === paymentOrderSubType.Collective;

    if ((!isClaim && !isCollectiveClaim) || !shouldUpdate) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    claimNumber: claimNumber
                }
            }
        }
    };
};
