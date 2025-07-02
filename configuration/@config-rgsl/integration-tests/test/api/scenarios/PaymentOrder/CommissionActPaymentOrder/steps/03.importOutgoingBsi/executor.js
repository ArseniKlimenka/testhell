const bsiExecutor = require('../../../../lib/bsi/executor');
const testHelperFuncs = require('../../../../lib/common/testHelperFuncs');

async function executor(step, context, stepContext) {

    const request = stepContext.requests['Body'];
    const uniqueNumber = await testHelperFuncs.getNextUnique();
    request.items[0].bankStatementItemNo = 'TEST_BSI_REFUND_OUT_' + uniqueNumber;
    context.bsiOut = await bsiExecutor.importBsi(request);

    console.log('BSI id: ' + context.bsiOut.id);
    console.log('BSI no: ' + context.bsiOut.no);
}

module.exports = {
    executor,
};
