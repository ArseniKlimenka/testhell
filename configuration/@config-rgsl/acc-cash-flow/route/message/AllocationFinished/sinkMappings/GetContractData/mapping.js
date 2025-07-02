'use strict';

const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function mapping(input, sinkExchange) {

    if (input.body.documentTypeId !== allocationDocumentType.POLICY) {
        sinkExchange.logMessages.push({
            message: 'AllocationDocumentType is not a policy',
            logLevel: 'debug'
        });
        return;
    }

    if (sinkExchange.isSkippingRoute === true) {

        return;
    }

    sinkExchange.logMessages.push({
        message: `Getting contract data by documentNo: ${input.body.documentNo}`,
        logLevel: 'debug'
    });

    const result = {
        input: {
            data: {
                criteria: {
                    contractNumber: input.body.documentNo
                }
            }
        }
    };

    return result;
};
