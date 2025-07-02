const { createInquiry } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/inquiries/executor');
const { getTextAttachment } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/attachmentHelpers');
const { parseEtag } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/etagLib');
const { VersionedDocumentBuilderRgsl } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testBuilderExtension');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');


async function executor(step, context, stepContext) {

    const builder = new VersionedDocumentBuilderRgsl('AccumulatedLifeInsurancePolicy');

    let contract = await builder
        .getDocumentByNumber(context.contractNumber)
        .setActor(stepContext.actor)
        .makeRelation('AccumulatedLifeInsurancePolicyCreateLifeAmendmentCancellationRelation')
        .waitActivitiyStatusExtension('OperationsApproval', true)
        .evaluate(undefined, ['/contractVersions'])
        .setActor(stepContext.actor)
        .update(_ => {
            const t = _.basicAmendmentConditions;
            t.amendmentReason = context.cancellationAmendmentReason;
            t.amendmentSubType = context.cancellationAmendmentSubType;
            t.validFrom = context.cancellationValidFrom;
            t.receiveMethod = 'email';
            t.applicationSignDate = context.cancellationValidFrom;
            t.applicationReceiveDate = context.cancellationValidFrom;
            t.fullPackageReceiveDate = context.cancellationValidFrom;

            const pac = _.paymentAmendmentConditions = {};
            pac.paymentLines = [];
            if (context.cancellationAmendmentReason === 'partialRepayment') {
                pac.paymentLines.push({ paymentLineType: 'partialPremiumRefund' });
            } else if (context.cancellationAmendmentReason === 'byClientNonCoolOff') {
                pac.paymentLines.push({ paymentLineType: 'surrenderValue' });
                pac.paymentLines.push({ paymentLineType: 'creditRefund' });
                pac.paymentLines.push({ paymentLineType: 'investProfit' });
                pac.paymentLines.push({ paymentLineType: 'PIT' });
                pac.paymentLines.push({ paymentLineType: 'debt' });
            }
        })
        .build();

    await createInquiry('CancellationInquiry', {
        configurationCodeName: 'AccumulatedLifeInsuranceCancellation',
        department: { code: 'accounting', nameLocalized: 'accounting' },
        inquiryReasons: [],
        textOfInquiry: undefined,
        cancellationNumber: contract.documentNumber,
        cancellationId: contract.id,
        creatorUserName: 'Administrator',
        holder: contract.body.technicalData?.policyInfo?.policyHolder?.name,
        contractNumber: contract.body.mainAttributes?.contract?.number,
        contractConfigurationCodeName: 'AccumulatedLifeInsurancePolicy',
    });

    await createInquiry('CancellationInquiry', {
        configurationCodeName: 'AccumulatedLifeInsuranceCancellation',
        department: { code: 'operationsDirector', nameLocalized: 'operationsDirector' },
        inquiryReasons: [],
        textOfInquiry: undefined,
        cancellationNumber: contract.documentNumber,
        cancellationId: contract.id,
        creatorUserName: 'Administrator',
        holder: contract.body.technicalData?.policyInfo?.policyHolder?.name,
        contractNumber: contract.body.mainAttributes?.contract?.number,
        contractConfigurationCodeName: 'AccumulatedLifeInsurancePolicy',
    });

    contract = await builder
        .setActor(stepContext.actor)
        .evaluate(undefined, ['/contractVersions'])
        .evaluate(undefined, ['/paymentAmendmentConditions[GetPolicyDates]'])
        .evaluate(undefined, ['**'])
        .build();

    const paymentLineTypeIncludeAmountPlus = ['surrenderValue', 'creditRefund', 'investProfit', 'partialPremiumRefund'];
    const paymentLineTypeIncludeAmountMinus = ['debt'];
    const refundAmountPlus = contract.body.paymentAmendmentConditions.paymentLines.filter(_ => paymentLineTypeIncludeAmountPlus.includes(_.paymentLineType)).reduce((p, c) => p + c.paymentLineSum, 0);
    const refundAmountMinus = contract.body.paymentAmendmentConditions.paymentLines.filter(_ => paymentLineTypeIncludeAmountMinus.includes(_.paymentLineType)).reduce((p, c) => p + c.paymentLineSum, 0);
    const refundAmount = refundAmountPlus - refundAmountMinus;
    if (refundAmount > 0) {
        contract = await builder
            .update(_ => {
                const pac = _.paymentAmendmentConditions;
                pac.canellationRecipients = [
                    {
                        recipientReason: amendmentConstants.defaultCancellationRecipientReason,
                        recipientPaymentType: amendmentConstants.defaultCancellationRecipientPaymentType,
                        amountToPayPercetage: 1,
                        partyId: context.contractBody.insuredPerson.partyData.partyId,
                        partyCode: context.contractBody.insuredPerson.partyData.partyCode,
                        partyType: context.contractBody.insuredPerson.partyData.partyType,
                        fullName: context.contractBody.insuredPerson.partyData.partyFullName,
                        bankAccount: context.contractBody.insuredPerson.partyData.partyBody.partyBankAccounts.map(i => {
                            return {
                                bankId: i.bankId,
                                bankName: i.bankName,
                                bankBic: i.bankBic,
                                bankCorrespondentAccount: i.bankCorrespondentAccount,
                                SWIFT: i.SWIFT,
                                IBAN: i.IBAN,
                                foreignBank: i.foreignBank,
                                currency: i.currency,
                                number: i.number,
                                openingDate: i.openingDate,
                                closingDate: i.closingDate,
                                bankInn: i.bankInn,
                            };
                        })[0],
                    }
                ];
            })
            .build();
    }

    contract = await builder
        .evaluate(undefined, [
            '/allocationsInfo',
            '/attachmentsPackage'])
        .evaluate(undefined, [
            '/paymentAmendmentConditions',
            '/paymentAmendmentConditions/**'])
        .uploadAttachment(getTextAttachment('cancellationApplication'))
        .build();

    if (refundAmount > 0) {
        contract = await builder
            .makeTransition('OperationsApproval_to_POCreation')
            .build();
    } else {
        contract = await builder
            .makeTransition('OperationsApproval_to_Activated')
            .build();
    }

    if (context.contractFieldName) {
        const contractId = parseEtag(contract.etag).id;
        const result = {
            id: contractId,
            number: contract.documentNumber,
            body: contract.body,
        };
        context[context.contractFieldName] = result;
    }
}

module.exports = {
    executor,
};
