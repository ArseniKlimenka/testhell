const ca = require('../../../../lib/commissionAct/executor');
const aaExecutor = require('../../../../lib/agentAgreement/executor.js');
const initialDataHelpers = require('../../../../lib/common/initialDataHelpers');
const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');

async function executor(step, context, stepContext) {

    const request = stepContext.requests['Body'];

    if (!context.aa) {
        if (context.agentAgreementId) {
            context.aa = await aaExecutor.getAgentAgreement(context.agentAgreementId);
        }
        else {
            context.aa = await initialDataHelpers.getDefaultAgentAgreement('999999');
        }
    }

    if (context.actIssueDate) {
        request.actIssueDate = context.actIssueDate;
    }

    const client = new Client();
    const response = await callDataSource('ServiceProviderDataSource', {
        paging: undefined,
        criteria: {
            serviceProviderCode: context.aa.agentCode,
        },
    }, client);

    const aasp = response.data[0].resultData;
    request.aaServiceProviderCode = context.aa.agentCode;
    request.aaServiceProviderName = aasp.partyDisplayName;
    request.agentBusinessCode = aasp.businessCode;
    request.aaNumber = context.aa.agentAgreementNumber;
    request.aaName = context.aa.manualNumber + '/' + context.aa.externalNumber;

    const act = await ca.createAct(request, stepContext.actor);

    context.act = act;
    console.log('Act: ' + JSON.stringify(act));
}

module.exports = {
    executor,
};
