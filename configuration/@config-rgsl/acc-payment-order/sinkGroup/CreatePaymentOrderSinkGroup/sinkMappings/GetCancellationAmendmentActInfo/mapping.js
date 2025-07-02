'use strict';

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mappingFunction(input) {
    if (input.paymentOrderType == paymentOrderType.PolicyCancellation && !input.paymentOrderSubtype)
    {
        return {
            input: {
                data: {
                    criteria: {
                        documentNumber: input.referenceNumber,
                        cancellationNumber: input.cancellationNumber
                    }
                }
            }
        };
    }
};
