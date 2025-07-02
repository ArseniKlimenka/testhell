'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function fetchMapping(input, sinkExchange) {

    const type = input.paymentOrderType;
    const contractAmendmentNumber = input.cancellationNumber;
    const shouldUpdate = input.shoudlUpdateRefDoc;

    if (type !== paymentOrderType.PolicyCancellation || !shouldUpdate) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: contractAmendmentNumber
                }
            }
        }
    };
};
