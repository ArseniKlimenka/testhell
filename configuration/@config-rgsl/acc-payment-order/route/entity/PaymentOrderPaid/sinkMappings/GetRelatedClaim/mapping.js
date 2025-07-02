'use strict';

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function fetchMapping(input, sinkExchange) {

    const type = input.body.paymentOrderInformation.paymentOrderType;
    const subType = input.body.paymentOrderInformation.paymentOrderSubType;
    const claimNumber = input.body.paymentOrderInformation.referenceNumber;

    const isClaim = type === paymentOrderType.Claim && !subType;
    const isCollectiveClaim = type === paymentOrderType.Claim && subType === paymentOrderSubType.Collective;

    if (!isClaim && !isCollectiveClaim) {

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
