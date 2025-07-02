'use strict';

const { invoicedCommissionTypeIds } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function fetch(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    contractNumbers: input.contracts.map(_ => _.contractNumber),
                    commTypes: [invoicedCommissionTypeIds.REGULAR],
                }
            }
        }
    };
};
