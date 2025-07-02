'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function fetchMapping(input, sinkExchange) {

    const type = input.body.paymentOrderInformation.paymentOrderType;
    const contractAmendmentNumber = input.body.paymentOrderInformation.contractAmendmentNumber;

    if (type !== paymentOrderType.PolicyCancellation) {

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
