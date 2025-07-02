'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    let result = undefined;

    if (input) {

        result = {
            claimNumber: input.number,
            contractNumber: input.body.contractNumber,
            contractConfigurationName: input.body.contractConfigurationName,
            contractConfigurationVersion: input?.body?.contractConfigurationVersion?.toString() || '1',
            contractStateCode: input.body.contractStateCode,
            contractStateDescription: input.body.contractStateDescription,
            insuredEvent: {
                insuredEventNumber: input.body?.insuredEvent?.insuredEventNumber,
                insuredEventType: input.body?.insuredEvent?.insuredEventType,
                insuredEventReason: input.body?.insuredEvent?.insuredEventReason,
                insuredEventDate: input.body?.insuredEvent?.insuredEventDate ? DateTimeUtils.formatDate(input.body.insuredEvent.insuredEventDate) : undefined,
            },
            applicationInfo: {
                applicantCode: input.body?.applicationInfo?.applicantCode,
                applicantFullName: input.body?.applicationInfo?.applicantFullName,
                applicantType: input.body?.applicationInfo?.applicantType,
                statementReceivedDate: input.body?.applicationInfo?.statementApplicationDate,
                statementApplicationDate: input.body?.applicationInfo?.statementReceivedDate
            },
            insuredPersonInfo: {
                insuredPersonCode: input.body?.insuredPersonInfo?.insuredPersonCode,
                insuredPersonFullName: input.body?.insuredPersonInfo?.insuredPersonFullName,
                insuredPersonType: input.body?.insuredPersonInfo?.insuredPersonType
            },
            policyHolderInfo: {
                policyHolderCode: input.body?.policyHolderInfo?.policyHolderCode,
                policyHolderFullName: input.body?.policyHolderInfo?.policyHolderFullName,
                policyHolderType: input.body?.policyHolderInfo?.policyHolderType
            },
            documentState: translationUtils.getTranslation(`document/${input.metadata.configuration.name}/1`, 'states', null, input.stateCode),
            documentStateCode: input.stateCode,
            risk: input.body.risk,
            paymentAmountInDocCurrency: input.body.paymentAmountInDocCurrency,
            paymentAmountInRubCurrency: input.body.paymentAmountInRubCurrency,
            diagnosis: input.body.diagnosis,
            diagnosisNote: input.body.diagnosisNote,
            claimBeneficiaries: input.body.claimBeneficiaries,
            contractCurrency: input.body.contractCurrency,
            riskAdditionalAttributes: input.body.riskAdditionalAttributes,
            totalPaymentPercentage: input.body.totalPaymentPercentage,
            risksInsuredSumByPeriod: input.body.risksInsuredSumByPeriod,
            approvalConclusions: input.body.approvalConclusions
        };
    }

    return result;
};
