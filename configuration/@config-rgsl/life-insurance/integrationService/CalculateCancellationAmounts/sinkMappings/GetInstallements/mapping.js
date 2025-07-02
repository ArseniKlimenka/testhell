'use strict';

const { paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function fetchMapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    contractNo: input.contractNumber
                }
            }
        }
    };
};
