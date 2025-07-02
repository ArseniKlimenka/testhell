const bsiExecutor = require('../../../../lib/bsi/executor');
const initialDataHelpers = require('../../../../lib/common/initialDataHelpers');
const testHelperFuncs = require('../../../../lib/common/testHelperFuncs');

async function executor(step, context, stepContext) {

    const request = stepContext.requests['Body'];
    const uniqueNumber = await testHelperFuncs.getNextUnique();
    request.items[0].bankStatementItemNo = 'TEST_BSI_REFUND_IN_' + uniqueNumber;
    context.bsiIn = await bsiExecutor.importBsi(request);
    context.party = await initialDataHelpers.getDefaultPartyPolicyHolder();

    console.log("Incoming BSI id: " + context.bsiIn.id);
    console.log("Incoming BSI no: " + context.bsiIn.no);
}

module.exports = {
    executor,
};
