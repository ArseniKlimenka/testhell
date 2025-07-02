'use strict';

const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.logMessages = [];

    if (input.body.documentTypeId !== allocationDocumentType.POLICY) {

        sinkExchange.logMessages.push({
            message: 'AllocationDocumentType is not a policy',
            logLevel: 'debug'
        });

        return;
    }

    sinkExchange.logMessages.push({
        message: `Getting allocations by ids: ${input.body.allocationIds?.join(', ')}`,
        logLevel: 'debug'
    });

    return {
        input: {
            data: {
                criteria: {
                    allocationIds: input.body.allocationIds
                }
            }
        }
    };
};
