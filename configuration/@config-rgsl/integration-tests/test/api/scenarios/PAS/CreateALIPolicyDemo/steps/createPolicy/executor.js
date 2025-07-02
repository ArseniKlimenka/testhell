const chai = require('chai');
const expect = chai.expect;
const aaExecutor = require('../../../../lib/agentAgreement/executor.js');
const { getAttachments } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachmentHelpers');
const { VersionedDocumentBuilderRgsl } = require('../../../../lib/common/testBuilderExtension');
const { parseEtag } = require('../../../../lib/common/etagLib');
const initialDataHelpers = require('../../../../lib/common/initialDataHelpers');
const { paymentFrequency } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils.js');
const { getCurrencyInfo } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/currencyHelpers');
const commonSql = require('@adinsure-tools/common-sql');

async function executor(step, context, stepContext) {

    const holder = await initialDataHelpers.getDefaultPartyPolicyHolder();
    const demo = await initialDataHelpers.getDefaultParty('Демо Партнер');
    const demoSP = await initialDataHelpers.getDefaultServiceProvider(demo.partyCode, undefined, '999999');

    const demoSeller = await initialDataHelpers.getDefaultParty('Продавец Демо Демо');
    const demoSellerSP = await initialDataHelpers.getDefaultServiceProvider(demoSeller.partyCode);
    const user = await initialDataHelpers.getDefaultUser(demoSellerSP.serviceProviderCode);

    const request = stepContext.requests['body'];

    if (context.policyStartDate) {
        const insuranceTerms = parseInt(request.basicConditions.insuranceTerms);
        const policyStartDate = context.policyStartDate;
        const policyStartDatePlusYears = dateTimeUtils.addYears(policyStartDate, insuranceTerms);
        const policyEndDate = dateTimeUtils.addDays(policyStartDatePlusYears, -1);
        request.policyTerms.startDate = policyStartDate;
        request.policyTerms.endDate = policyEndDate;
        request.policyTerms.effectiveDate = policyStartDate;
        request.policyTerms.paymentPeriodStartDate = policyStartDate;
        request.policyTerms.paymentPeriodEndDate = policyEndDate;
        request.policyTerms.accumulationPeriodStartDate = policyStartDate;
        request.policyTerms.accumulationPeriodEndDate = policyEndDate;
        request.policyTerms.payOutStartDate = policyStartDatePlusYears;
        request.policyTerms.payOutEndDate = policyStartDatePlusYears;

        request.basicConditions.issueDate = policyStartDate;
        request.basicConditions.applicationDate = policyStartDate;
        request.basicConditions.receiptDate = policyStartDate;
        request.basicConditions.acceptToWorkDate = policyStartDate;
    }

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

    await updateFinancialQuestionaryForPerson(holder.partyCode);

    if (context.currencyCode) {
        request.basicConditions.currency = await getCurrencyInfo(context.currencyCode);
    }

    request.mainInsuranceConditions.partner = {
        partnerCode: demoSP.serviceProviderCode,
        partnerDescription: demoSP.partyShortName,
        partnerBusinessCode: demoSP.businessCode,
    };

    request.initiator = {
        userId: user.userId,
        userName: user.userName,
        partyCode: user.partyCode,
        partyFullName: user.partyFullName,
        employeeCode: user.employeeCode,
        organisationUnitCode: user.organisationUnitCode,
        organisationUnitName: user.organisationUnitName,
    };

    if (!context.aa) {
        if (context.agentAgreementId) {
            context.aa = await aaExecutor.getAgentAgreement(context.agentAgreementId);
        }
        else {
            context.aa = await initialDataHelpers.getDefaultAgentAgreement('999999');
        }
    }

    if (context.invoiceOnActivation) {
        request.basicConditions.invoiceOnActivation = context.invoiceOnActivation;
    }

    if (context.riskPremium) {
        request.basicConditions.riskPremium = context.riskPremium;
    }

    if (context.paymentFrequencyCode) {
        const pf = Object.keys(paymentFrequency).filter(_ => paymentFrequency[_].code === context.paymentFrequencyCode).map(_ => paymentFrequency[_]);

        if (pf[0]) {
            request.basicConditions.paymentFrequency.paymentFrequencyCode = pf[0].code;
            request.basicConditions.paymentFrequency.paymentFrequencyDescription = pf[0].description;
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

    if (context.contractFieldName) {
        context[context.contractFieldName] = result;
    }
}

async function updateFinancialQuestionaryForPerson(partyCode) {

    const config = JSON.parse(process.env.TEST_ENV_CONFIG);

    const testingEnvironment = config.testingProperties.databaseTestingEnvironments[config.databaseProvider];
    testingEnvironment.trustServerCertificate = true; // TODO: remove this line after LJADIRDSUP-17823 will be fixed
    const database = await commonSql.createDatabase(config.databaseProvider, testingEnvironment);

    const parameters = {
        partyCode,
    };
    const result1 = await database.execute(`update are
    set
        SYS_CREATED_ON = SYSDATETIME(), SYS_UPDATED_ON = SYSDATETIME()
    from
        pty.PARTY pty
        inner join bfx.ATTACHMENT_RELATED_ENTITY are on are.ENTITY_REF_ID = pty.PARTY_ID
        inner join bfx.ATTACHMENT a on a.ATTACHMENT_ID = are.ATTACHMENT_ID
    where 1=1
        and pty.PARTY_CODE = @partyCode
        and a.ATTACHMENT_TYPE = 'financialQuestionary'`, parameters);
    console.log('SQL UPDATE PARTY ATTACHMENT 1 RESULT: ' + JSON.stringify(result1));

    const result2 = await database.execute(`update a
    set
        SYS_CREATED_ON = SYSDATETIME(), SYS_UPDATED_ON = SYSDATETIME()
    from
        pty.PARTY pty
        inner join bfx.ATTACHMENT_RELATED_ENTITY are on are.ENTITY_REF_ID = pty.PARTY_ID
        inner join bfx.ATTACHMENT a on a.ATTACHMENT_ID = are.ATTACHMENT_ID
    where 1=1
        and pty.PARTY_CODE = @partyCode
        and a.ATTACHMENT_TYPE = 'financialQuestionary'`, parameters);
    console.log('SQL UPDATE PARTY ATTACHMENT 2 RESULT: ' + JSON.stringify(result2));
}

async function createAccumulatedLifeInsurancePolicy(request, actor) {

    let builder = new VersionedDocumentBuilderRgsl('AccumulatedLifeInsuranceQuote');
    const quote = await builder
        .setExample(({ body: request }))
        .setActor(actor)
        .create()
        .waitActivitiyStatusExtension('Draft')
        .evaluate(undefined, [ '/productConfiguration' ]) // We should get product configuration before other enrichments
        .evaluate(undefined, ['**'])
        .evaluate(undefined, ['/uwTriggers']) // TODO: temporal solution. risk.riskPremium is needed in the uwTriggers, but is is calculated in the generateSummary
        .build();

    const attachments = getAttachments();
    builder = new VersionedDocumentBuilderRgsl('AccumulatedLifeInsuranceQuote');
    const contract = await builder
        .getDocumentByNumber(quote.documentNumber)
        .setActor(actor)
        .makeRelation('AccumulatedLifeInsuranceQuoteCreatePolicyRelation')
        .waitActivitiyStatusExtension('Draft')
        .setActor(actor)
        .uploadAttachment(attachments.contractSigned)
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
