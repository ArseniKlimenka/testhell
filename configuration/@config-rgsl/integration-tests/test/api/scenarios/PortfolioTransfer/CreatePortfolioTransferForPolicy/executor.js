const { Client } = require('@adinsure-tools/api-test-framework');
const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function executor(step, context, stepContext) {

    const partner = context.contractBody.mainInsuranceConditions.partner;
    const agentAgreement = context.contractBody.commission.agentAgreement;
    const body = {
        stateCodes: [],
        issueDate: context.portfolioTransferIssueDate,

        aaServiceProviderCodeFrom: partner.partnerCode,
        aaServiceProviderCodeTo: partner.partnerCode,

        aaServiceProviderNameFrom: partner.partnerDescription,
        aaServiceProviderNameTo: partner.partnerDescription,

        aaNumberFrom: agentAgreement.number,
        aaNumberTo: agentAgreement.number,

        aaNameFrom: agentAgreement.formatedNumber,
        aaNameTo: agentAgreement.formatedNumber,

        agentTabNumberFrom: "number 1",
        agentTabNumberTo: "number 1",

        sadNumberFrom: undefined,
        sadNumberTo: undefined,
    };

    const builder = new VersionedDocumentBuilderRgsl('PortfolioTransfer');
    const document = await builder
        .setExample({ body })
        .setActor(stepContext.actor)
        .create()
        .retryValidate(
            async (ctx) => {
                const request = {
                    data: {
                        ptNumber: ctx.documentNumber,
                        aaNumberFrom: ctx.body.aaNumberFrom,
                        contractNumber: context.referenceNoToInclude,
                    }
                };
                const client = new Client();
                const data = await client.HttpPost({
                    apiPath: '/api/core/shared/integration-services/PtAutoPopulate/1',
                    requestBody: request
                });
                return data;
            },
            (result, ctx) => {
                expect(result.data.newCount, 'PT was not populated!').to.be.equal(5);
            }
        )
        .makeTransition('Draft_To_TransferProcessing')
        .retryValidateGet(
            (ctx) => {
                expect(ctx.documentState).to.not.be.equals('TransferProcessing');
            },
            { retryCount: 8, initialDelay: 1000, backoff: true, backoffFactor: 2 },
        )
        .build();

    expect(document.documentState).to.be.equals('Processed');

    context.pt = {
        number: document.documentNumber,
        id: document.id,
        body: document.body,
    };
}

module.exports = {
    executor,
};
