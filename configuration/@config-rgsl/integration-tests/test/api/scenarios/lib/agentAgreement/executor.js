const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const { VersionedDocumentBuilder } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

function getResult(agentAgreement) {
    const result = {};
    result.id = agentAgreement.id;
    result.number = agentAgreement.documentNumber;
    return result;
}

async function getAgentAgreement(request) {
    const client = new Client();
    const response = await callDataSource('GetAgentAgreementInfoDataSource', {
        paging: undefined,
        criteria : {
            fetchOriginal: true,
            agentAgreementId: request.id,
        },
    }, client);

    const data = response.data;
    data.sort((a, b) => {
        const valA = a.resultData.aaLoadDate;
        const valB = b.resultData.aaLoadDate;
        return valA < valB ? -1 : valA > valB ? 1 : 0;
    });

    return data[data.length - 1].resultData;
}

async function createAndActivate(request, actor) {

    const builder = new VersionedDocumentBuilder('AgentAgreement');
    const agentAgreement = await builder
        .setExample(request)
        .setActor(actor)
        .create()
        .makeTransition('DraftToActivated', 'Activated')
        .retryValidateDataSource(
            'GetAgentAgreementInfoDataSource',
            context => ({
                paging: undefined,
                criteria : { agentAgreementNumber: context.documentNumber },
            }),
            (result, context) => {
                expect(result.data.length, 'AA was not found!').to.be.equals(1);
                const aa = result.data[0].resultData;
                expect(aa.agentAgreementNumber, 'Wrong AA number!').to.be.equals(context.documentNumber);
            },
        )
        .build();

    return getResult(agentAgreement);
}

module.exports = {
    getAgentAgreement,
    createAndActivate,
};
