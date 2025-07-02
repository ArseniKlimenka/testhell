const testHelperFuncs = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');
const bsiExecutor = require('@config-rgsl/integration-tests/test/api/scenarios/lib/bsi/executor');

async function createPayment(step, context, stepContext) {

    const request = stepContext.requests['Body'];
    const item = request.items[0];
    item.amount = context.amountToAllocate;
    if (context.paymentDetails) {
        Object.assign(item, context.paymentDetails);
    }

    const newNumber = await testHelperFuncs.getNextUnique();
    item.bankStatementItemNo = 'TEST_BSI_' + newNumber;

    context.bsi = await bsiExecutor.importBsi(request);

    console.log('BSI id: ' + context.bsi.id);
}

module.exports = {
    createPayment,
};
