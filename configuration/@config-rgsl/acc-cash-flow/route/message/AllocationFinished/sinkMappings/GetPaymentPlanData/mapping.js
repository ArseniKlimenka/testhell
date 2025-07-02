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

    const dueDates = sinkExchange.allocations.map(x => x.dueDate);

    sinkExchange.logMessages.push({
        message: `Getting payment plan data by contractNumber: ${input.body.documentNo} and dueDates: ${dueDates?.join(', ')}`,
        logLevel: 'debug'
    });

    const result = {
        input: {
            data: {
                criteria: {
                    contractNumber: input.body.documentNo,
                    dueDates: dueDates,
                }
            }
        }
    };

    return result;
};
