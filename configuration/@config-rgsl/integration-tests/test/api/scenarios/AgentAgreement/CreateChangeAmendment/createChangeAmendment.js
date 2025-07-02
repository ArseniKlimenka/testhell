const { VersionedDocumentBuilder } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

async function createChangeAmendment(step, context, stepContext) {

    const builder = new VersionedDocumentBuilder('AgentAgreement');
    const amendment = await builder
        .setActor(stepContext.actor)
        .getDocumentByNumber(context.agentAgreement.number)
        .makeRelation('AgentAgreementCreateChangeAmendmentRelation')
        .update(_ => {
            _.commissionRules[0].rate = 0.1;
            _.amendmentData.changeAmendmentData.manualDocumentNumber = _.mainAttributes.manualDocumentNumber + '_AM';
            _.amendmentData.changeAmendmentData.validity.startDate = context.amdnmentStartDate;
            _.amendmentData.changeAmendmentData.validity.conclusionDate = context.amdnmentStartDate;
            _.amendmentData.changeAmendmentData.changesNote = 'Amendment notes';
        })
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

    context.agentAgreementAmendment = {
        number: amendment.documentNumber,
        id: amendment.id,
    };
    console.log("AA amendment created: " + JSON.stringify(context.agentAgreementAmendment));
}

module.exports = {
    createChangeAmendment,
};
