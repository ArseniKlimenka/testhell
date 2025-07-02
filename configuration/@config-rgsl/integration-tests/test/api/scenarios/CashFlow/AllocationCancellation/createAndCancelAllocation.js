const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const { allocationToleranceType } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');

async function createAndCancelAllocation(step, context, stepContext) {

    const client = new Client();
    const request = {
        bankStatementItemId: context.bsi.id,
        payAmount: 99980,
        referenceNo: context.contractNumber,
        toleranceType: allocationToleranceType.STANDARD,
    };

    const allocationResponce = await client.HttpPost({
        apiPath: '/api/rgsl/accounting/shared/cash-flow/allocation/allocate',
        requestBody: request
    });

    const cancelResponce = await client.HttpPost({
        apiPath: '/api/rgsl/accounting/shared/cash-flow/allocation/cancel-allocation',
        requestBody: { allocationIds: allocationResponce.allocationIds }
    });
}

module.exports = {
    createAndCancelAllocation,
};
