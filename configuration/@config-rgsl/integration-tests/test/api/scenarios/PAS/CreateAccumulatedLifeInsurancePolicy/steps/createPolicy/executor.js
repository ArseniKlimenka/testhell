const chai = require('chai');
const expect = chai.expect;
const aaExecutor = require('@config-rgsl/integration-tests/test/api/scenarios/lib/agentAgreement/executor');
const { getAttachments } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachmentHelpers');
const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');
const { parseEtag } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/etagLib');
const initialDataHelpers = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/initialDataHelpers');

async function executor(step, context, stepContext) {

    const holder = await initialDataHelpers.getDefaultPartyPolicyHolder();
    const bfko = await initialDataHelpers.getDefaultPartyBFKO();

    const request = stepContext.requests['body'];

    request.policyHolder.partyData = {
        partyId: holder.partyId,
        partyCode: holder.partyCode,
        partyType: 'NaturalPerson',
    };
    request.insuredPerson.partyData = {
        partyId: holder.partyId,
        partyCode: holder.partyCode,
        partyType: 'NaturalPerson',
    };

    const bfkoSP = await initialDataHelpers.getDefaultServiceProvider(bfko.partyCode, 'Partner');
    request.mainInsuranceConditions.partner = {
        partnerCode: bfkoSP.serviceProviderCode,
        partnerDescription: bfkoSP.partyShortName,
        partnerBusinessCode: bfkoSP.businessCode,
    };

    if (!context.aa) {
        if (context.agentAgreementId) {
            context.aa = await aaExecutor.getAgentAgreement(context.agentAgreementId);
        }
        else {
            context.aa = await initialDataHelpers.getDefaultAgentAgreement('249411');
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

    const result = await createAccumulatedLifeInsurancePolicy(request, stepContext.actor);

    context.contractId = result.id;
    context.contractNumber = result.number;
    context.contractBody = result.body;
}

async function createAccumulatedLifeInsurancePolicy(request, actor) {

    const attachments = getAttachments();

    const builder = new VersionedDocumentBuilderRgsl('AccumulatedLifeInsuranceQuote');
    const contract = await builder
        .setExample(({ body: request }))
        .setActor(actor)
        .create()
        .waitActivitiyStatusExtension('Draft')
        .evaluate(undefined, [ '/productConfiguration' ]) // We should get product configuration before other enrichments
        .evaluate(undefined, ['**'])
        .evaluate(undefined, [ '/uwTriggers' ]) // TODO: temporal solution. risk.riskPremium is needed in the uwTriggers, but is is calculated in the generateSummary
        .setActor(actor)
        .update((body) => {
            for (const commissionItem of body.commission.policyCommissionItems) {
                if (commissionItem.policyItemCode === 'E36102') {
                    commissionItem.manualRate = 0.13;
                }
            }
        })
        .makeRelation('AccumulatedLifeInsuranceQuoteCreatePolicyRelation')
        .waitActivitiyStatusExtension('Draft')
        .setActor(actor)
        .uploadAttachment(attachments.contractSigned)
        .uploadAttachment(attachments.bankNotification)
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

    const contractId = parseEtag(contract.etag).id;
    return {
        id: contractId,
        number: contract.documentNumber,
        body: contract.body,
    };
}

module.exports = {
    executor,
};
