'use strict';

const { paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mappingFunction(input) {

    if (input.paymentOrderSubtype !== paymentOrderSubType.Endowment) {

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
