const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');

async function cancelAllocation(step, context, stepContext) {

    const client = new Client();

    const dataSourceCriteria = {
        contractNumber: context.cancelAllocContractNumber
    };

    if (context.cancelAllocDueDate) {
        dataSourceCriteria.dueDate = context.cancelAllocDueDate;
    }

    const allocationData = await callDataSource('GetAllocationTestDataSource', {
        paging: undefined,
        criteria: dataSourceCriteria
    }, client);

    const allocationIds = allocationData.data.map(_ => _.resultData.allocationId);

    const cancelResponce = await client.HttpPost({
        apiPath: '/api/rgsl/accounting/shared/cash-flow/allocation/cancel-allocation',
        requestBody: { allocationIds }});
}

module.exports = {
    cancelAllocation,
};
