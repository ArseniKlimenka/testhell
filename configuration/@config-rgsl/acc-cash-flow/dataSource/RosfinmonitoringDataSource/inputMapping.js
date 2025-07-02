'use strict';

const { bankStatementItemStatusId, bankStatementDirection } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function DataSourceInputMapping(input) {

    if (!input?.data?.criteria) {
        throw "Input criteria was not defined!";
    }

    const paymentStatusIds = input?.data?.criteria?.paymentStatusIds ?? [];
    const isAllocated = paymentStatusIds?.includes(bankStatementItemStatusId.PARTIALLY_ALLOCATED) || paymentStatusIds?.includes(bankStatementItemStatusId.ALLOCATED);
    const isNotAllocated = paymentStatusIds?.includes(bankStatementItemStatusId.NOT_ALLOCATED) && input?.data?.criteria?.direction === bankStatementDirection.INCOMING;

    input.data.criteria.isAllocated = isAllocated;
    input.data.criteria.isNotAllocated = isNotAllocated;

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;
};
