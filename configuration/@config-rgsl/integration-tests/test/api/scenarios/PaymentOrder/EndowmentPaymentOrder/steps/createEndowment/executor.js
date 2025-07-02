const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');
const { getAttachments } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachmentHelpers');
const { retryValidate } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');
const chai = require('chai');
const expect = chai.expect;
const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { insuredEventReasons } = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { createInquiry } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/inquiries/executor');

async function executor(step, context, stepContext) {

    const body = stepContext.requests['body'];

    const endowment = await createEndowment(context.contractNumber, stepContext.actor);

    context.endowmentId = endowment.id;
    context.endowmentNumber = endowment.number;
    context.endowmentBody = endowment.body;

    const client = new Client();
    const result = await retryValidate(
        async () => callDataSource('PODocumentSearchDataSource', {
            paging: undefined,
            criteria: {
                referenceNumber: endowment.number,
                paymentOrderType: paymentOrderType.Claim,
            },
        }, client),
        (result, cntx) => {
            expect(result.data.length, 'PO not found!').to.be.equal(1);
        },
    );

    context.paymentOrder = result.data[0].resultData;
}

async function createEndowment(contractNumber, actor) {

    const attachments = getAttachments();
    let builder = new VersionedDocumentBuilderRgsl('AccumulatedLifeInsurancePolicy');
    let document = await builder
        .getDocumentByNumber(contractNumber)
        .setActor(actor)
        .makeRelation('AccumulatedLifeInsurancePolicyCreateEndowmentRelation')
        .update(_ => {
            _.mainAttributes.applicationInfo.receiveMethod = 'email';
            _.mainAttributes.applicationInfo.eventDate = '2022-01-01';
            _.mainAttributes.applicationInfo.statementApplicationDate = '2022-01-01';
            _.mainAttributes.applicationInfo.statementReceivedDate = '2022-01-01';
            _.mainAttributes.eventReason = insuredEventReasons.annualOrCoupon;
            _.mainAttributes.selectedRisk = _.mainAttributes.availableRisks[0];
            const beneficiary = _.endowmentBeneficiaries[0];
            beneficiary.amountToPayPercetage = 0.1;
            beneficiary.amountToPay = 10000;
            beneficiary.pitAmount = 0;
            beneficiary.amountToPayInRubCurrency = 10000;
            beneficiary.pitAmountInRubCurrency = 0;
            _.endowmentAmounts.paymentLines.push({
                lineType: 'surrenderValue',
                lineAmountInContractCurrency: 100000,
                lineAmountInRubCurrency: 100000,
                weight: 1,
            });
            _.endowmentAmounts.rznu = 100000;
            _.endowmentAmounts.exchangeRate = 1;
            _.approvalRequests = {};
            _.approvalConclusions = {};
            _.endowmentPaymentFrequency = {
                code: '1',
                description: 'Единовременно',
            };
            _.endowmentAttachmentsPackage = [];
        })
        .uploadAttachment(attachments.claim.edowmentApplication)
        .uploadAttachment(attachments.claim.insuredAliveConfirmation)
        .uploadAttachment(attachments.claim.paymentRecipientPassport)
        .waitActivitiyStatusExtension('OperationsApproval', true)
        .build();

    await createInquiry('EndowmentInquiry', {
        department: { code: 'operationsDirector', nameLocalized: 'operationsDirector'},
        inquiryReasons: [],
        textOfInquiry: undefined,
        endowmentNumber: document.documentNumber,
        endowmentId: document.id,
        creatorUserName: 'Administrator',
        holder: document.body.technicalData?.policyInfo?.policyHolder?.name,
        contractNumber: document.body.mainAttributes?.contract?.number,
        contractConfigurationCodeName: document.body.mainAttributes?.contract?.configurationName,
    });

    builder = new VersionedDocumentBuilderRgsl('Endowment');
    document = await builder
        .getDocumentByNumber(document.documentNumber)
        .makeTransition('OperationsApproval_to_POCreation', 'POCreation')
        .build();

    return {
        id: document.id,
        number: document.documentNumber,
        body: document.body,
    };
}

module.exports = {
    executor,
};
