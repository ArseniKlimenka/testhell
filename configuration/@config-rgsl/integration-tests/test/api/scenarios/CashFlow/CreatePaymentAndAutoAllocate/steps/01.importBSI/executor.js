const testHelperFuncs = require('../../../../lib/common/testHelperFuncs');
const bsiExecutor = require('../../../../lib/bsi/executor');

async function executor(step, context, stepContext) {

    const request = stepContext.requests['Body'];
    const item = request.items[0];
    item.amount = context.amountToAllocate;
    if (context.paymentDate) {
        item.paymentDate = context.paymentDate;
    }
    if (context.transactionDate) {
        item.transactionDate = context.transactionDate;
    }

    if (context.currencyCode) {
        item.currencyCode = context.currencyCode;
    }

    const newNumber = await testHelperFuncs.getNextUnique();
    item.bankStatementItemNo = 'TEST_BSI_' + newNumber;

    context.bsi = await bsiExecutor.importBsi(request);

    console.log("BSI id: " + context.bsi.id);
}

module.exports = {
    executor,
};
