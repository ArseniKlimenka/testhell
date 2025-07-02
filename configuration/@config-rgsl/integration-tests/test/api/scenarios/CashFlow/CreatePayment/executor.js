const testHelperFuncs = require('../../lib/common/testHelperFuncs');
const bsiExecutor = require('../../lib/bsi/executor');

async function executor(step, context, stepContext) {

    const request = stepContext.requests['Body'];
    const item = request.items[0];
    item.amount = context.paymentAmount;

    const newNumber = await testHelperFuncs.getNextUnique();
    item.bankStatementItemNo = 'TEST_BSI_' + newNumber;
    Object.assign(item, context.data);

    const result = await bsiExecutor.importBsi(request);

    console.log('BSI id: ' + result.id);
    console.log('BSI no: ' + result.no);

    context.bsi = result;
    if (context.fieldName) {
        context[context.fieldName] = result;
    }
}

module.exports = {
    executor,
};
