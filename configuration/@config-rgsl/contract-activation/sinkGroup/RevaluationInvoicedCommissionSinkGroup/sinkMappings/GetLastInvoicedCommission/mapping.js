'use strict';

const { invoicedCommissionTypeIds } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function fetch(input, sinkExchange) {
    const policyInfos = sinkExchange.resolveContext('policyInfos');
    if (policyInfos.length === 0) {
        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    contractNumbers: policyInfos.map(_ => _.contractNumber),
                    commTypes: [invoicedCommissionTypeIds.REGULAR, invoicedCommissionTypeIds.VOID],
                }
            }
        }
    };
};
