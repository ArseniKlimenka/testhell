const testHelperFuncs = require('../../lib/common/testHelperFuncs');
const bsiExecutor = require('../../lib/bsi/executor');

async function executor(step, context, stepContext) {

    const request = stepContext.requests['Body'];
    const item = request.items[0];
    item.amount = context.paymentAmount;
    if (context.transactionDate) {
        item.transactionDate = context.transactionDate;
    }

    if (context.referenceNoToAllocate) {
        item.paymentDescription = 'Test payment for: ' + context.referenceNoToAllocate;
    }

    const newNumber = await testHelperFuncs.getNextUnique();
    item.bankStatementItemNo = 'TEST_BSI_' + newNumber;

    context.bsi = await bsiExecutor.importBsi(request);

    console.log("BSI id: " + context.bsi.id);
    console.log("BSI no: " + context.bsi.no);
}

module.exports = {
    executor,
};
