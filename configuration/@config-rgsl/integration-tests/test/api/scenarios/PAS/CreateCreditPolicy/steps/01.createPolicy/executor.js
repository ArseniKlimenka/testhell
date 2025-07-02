const chai = require('chai');
const expect = chai.expect;
const { VersionedDocumentBuilderRgsl } = require('../../../../lib/common/testBuilderExtension');

const aaExecutor = require('../../../../lib/agentAgreement/executor.js');
const initialDataHelpers = require('../../../../lib/common/initialDataHelpers');

async function executor(step, context, stepContext) {

    const holder = await initialDataHelpers.getDefaultPartyPolicyHolder();
    const partner = await initialDataHelpers.getDefaultParty('БФКО АВТО');

    context.holder = holder;
    context.insured = partner;

    const request = stepContext.requests['Body'];

    const partnerSP = await initialDataHelpers.getDefaultServiceProvider(partner.partyCode, 'Partner');
    request.mainInsuranceConditions.partner = {
        partnerCode: partnerSP.serviceProviderCode,
        partnerDescription: partnerSP.partyShortName,
        partnerBusinessCode: partnerSP.businessCode,
    };

    request.initiator = await getInitiator();

    request.policyHolder.partyData = {
        partyId: holder.partyId,
        partyCode: holder.partyCode,
        partyType: 'NaturalPerson',
        partyBody: holder.body
    };
    request.insuredPerson.partyData = {
        partyId: holder.partyId,
        partyCode: holder.partyCode,
        partyType: 'NaturalPerson',
        partyBody: holder.body
    };

    if (!context.aa) {
        if (context.agentAgreementId) {
            context.aa = await aaExecutor.getAgentAgreement(context.agentAgreementId);
        }
        else {
            context.aa = await initialDataHelpers.getDefaultAgentAgreement('107093');
        }
    }
    request.commission.agentAgreement = {
        id: context.aa.agentAgreementId,
        number: context.aa.agentAgreementNumber,
        manualNumber: context.aa.manualNumber,
        externalNumber: context.aa.externalNumber,
        formatedNumber: context.aa.manualNumber + '/' + context.aa.externalNumber,
        amendmentNumber: context.aa.agentAgreementNumber,
    };

    const result = await createAndActivate(request, stepContext.actor);

    context.contractId = result.id;
    context.contractNumber = result.number;
    context.contractBody = result.body;
}

async function getInitiator() {
    const demoSeller = await initialDataHelpers.getDefaultParty('Инициатор БФКОАВТО');
    const demoSellerSP = await initialDataHelpers.getDefaultServiceProvider(demoSeller.partyCode);
    const user = await initialDataHelpers.getDefaultUser(demoSellerSP.serviceProviderCode);
    const initiator = {
        userId: user.userId,
        userName: user.userName,
        partyCode: user.partyCode,
        partyFullName: user.partyFullName,
        employeeCode: user.employeeCode,
        organisationUnitCode: user.organisationUnitCode,
        organisationUnitName: user.organisationUnitName,
    };

    return initiator;
}

async function createAndActivate(request, actor) {

    const builder = new VersionedDocumentBuilderRgsl('CreditLifeInsuranceQuote');
    const contract = await builder
        .setExample({ body: request })
        .setActor(actor)
        .create()
        .evaluate(undefined, [ '/productConfiguration' ]) // We should get product configuration before other enrichments
        .evaluate(undefined, ['**'])
        .evaluate(undefined, [ '/uwTriggers' ]) // TODO: temporal solution. risk.riskPremium is needed in the uwTriggers, but is is calculated in the generateSummary
        .setActor(actor)
        .makeRelation('CreditLifeInsuranceQuoteCreatePolicyRelation')
        .waitActivitiyStatusExtension('Draft')
        .makeTransition('Draft_to_Active', 'Active')
        .retryValidateDataSource(
            'GetPolicyInfoTestDataSource',
            context => ({
                paging: undefined,
                criteria: { contractNumber: context.documentNumber },
            }),
            (result, context) => {
                expect(result.data.state, 'Correct policy state was not set!').to.be.equal('Active');
                expect(result.data.refExists, 'No reference was created!').to.be.true;
                expect(result.data.ppLoadDate, 'PP was not generated!').to.not.be.undefined;
                expect(result.data.commLoadDate, 'Policy commission was not generated!').to.not.be.undefined;
            },
        )
        .build();

    return {
        id: contract.id,
        number: contract.documentNumber,
        body: contract.body,
    };
}

module.exports = {
    executor,
};
