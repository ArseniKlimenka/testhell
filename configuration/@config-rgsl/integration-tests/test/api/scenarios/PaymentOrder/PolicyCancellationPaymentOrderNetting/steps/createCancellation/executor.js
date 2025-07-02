const { getTextAttachment } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachmentHelpers');
const { paymentLineType } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');
const { createInquiry } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/inquiries/executor');
const { parseEtag } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/etagLib');
const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

async function executor(step, context, stepContext) {

    let builder = new VersionedDocumentBuilderRgsl('AccumulatedLifeInsurancePolicy');

    let contract = await builder
        .getDocumentByNumber(context.contract1.number)
        .setActor(stepContext.actor)
        .makeRelation('AccumulatedLifeInsurancePolicyCreateLifeAmendmentCancellationRelation')
        .waitActivitiyStatusExtension('OperationsApproval', true)
        .evaluate(undefined, ['/contractVersions'])
        .setActor(stepContext.actor)
        .update(_ => {
            if (!_.basicAmendmentConditions) { _.basicAmendmentConditions = {}; }
            if (!_.paymentAmendmentConditions) { _.paymentAmendmentConditions = {}; }

            const t = _.basicAmendmentConditions;
            t.amendmentReason = context.cancellationAmendmentReason;
            t.amendmentSubType = context.cancellationAmendmentSubType;
            t.validFrom = context.cancellationValidFrom;
            t.receiveMethod = 'email';
            t.applicationSignDate = context.cancellationValidFrom;
            t.applicationReceiveDate = context.cancellationValidFrom;
            t.fullPackageReceiveDate = context.cancellationValidFrom;

            _.paymentAmendmentConditions.paymentLines = [
                {
                    paymentLineType: paymentLineType.surrenderValue,
                    paymentLineSum: 90000,
                },
                {
                    paymentLineType: paymentLineType.investProfit,
                    paymentLineSum: 10000,
                },
            ];

            const holder = _.basicAmendmentConditions.applicant;
            _.paymentAmendmentConditions.paymentLinesManualCorrection = true;
            _.paymentAmendmentConditions.canellationRecipients = [
                {
                    partyId: context.contractBody.policyHolder.partyData.partyId,
                    partyCode: holder.partyCode,
                    partyType: holder.partyType,
                    fullName: holder.fullName,
                    recipientReason: amendmentConstants.defaultCancellationRecipientReason,
                    recipientPaymentType: amendmentConstants.defaultCancellationRecipientPaymentType,
                    amountToPayPercetage: 1,
                    amountToPay: 100000,
                    amountToPayInRubCurrency: 100000,
                    pitAmount: 0,
                    pitAmountInRubCurrency: 0,
                }
            ];

        })
        .evaluate(undefined, ['/contractVersions'])
        .evaluate(undefined, ['/paymentAmendmentConditions[GetPolicyDates]'])
        .evaluate(undefined, ['**'])
        .evaluate(undefined, [
            '/allocationsInfo',
            '/attachmentsPackage',
            '/paymentAmendmentConditions[SetDefaultRecipientsBankAccounts]'])
        .build();

    await createInquiry('CancellationInquiry', {
        configurationCodeName: 'AccumulatedLifeInsuranceCancellation',
        department: { code: 'operationsDirector', nameLocalized: 'operationsDirector'},
        inquiryReasons: [],
        textOfInquiry: undefined,
        cancellationNumber: contract.documentNumber,
        cancellationId: contract.id,
        creatorUserName: 'Administrator',
        holder: contract.body.technicalData?.policyInfo?.policyHolder?.name,
        contractNumber: contract.body.mainAttributes?.contract?.number,
        contractConfigurationCodeName: 'AccumulatedLifeInsurancePolicy',
    });

    builder = new VersionedDocumentBuilderRgsl('AccumulatedLifeInsuranceCancellation');

    contract = await builder
        .getDocumentByNumber(contract.documentNumber)
        .setActor(stepContext.actor)
        .uploadAttachment(getTextAttachment('cancellationApplication'))
        .uploadAttachment(getTextAttachment('copyPassport'))
        .uploadAttachment(getTextAttachment('copyPolicy'))
        .makeTransition('OperationsApproval_to_POCreation')
        .build();

    const contractId = parseEtag(contract.etag).id;
    const result = {
        id: contractId,
        number: contract.documentNumber,
        body: contract.body,
    };
    context.amendment = result;
}

module.exports = {
    executor,
};
