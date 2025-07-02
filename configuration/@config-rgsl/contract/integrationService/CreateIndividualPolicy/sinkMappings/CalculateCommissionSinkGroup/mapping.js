const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(lineInput, sinkExchange) {
    const validationErrors = sinkExchange.resolveContext('validationErrors');

    if (validationErrors?.length > 0) {
        return;
    }

    const createdPolicyBody = sinkExchange.resolveContext('createdPolicyBody');
    const createdPolicyNumber = sinkExchange.resolveContext('createdPolicyNumber');
    const agentAgreementId = createdPolicyBody.commission.agentAgreement?.id;
    const agentAgreementNumber = createdPolicyBody.commission.agentAgreement?.number;
    const partnerCode = createdPolicyBody.mainInsuranceConditions.partner?.partnerCode;
    const ruleCode = createdPolicyBody.insuranceRules?.ruleCode;
    const productCode = createdPolicyBody.mainInsuranceConditions.insuranceProduct?.productCode;
    const currencyCode = createdPolicyBody.basicConditions.currency?.currencyCode;
    const startDate = createdPolicyBody.policyTerms?.startDate;
    const endDate = createdPolicyBody.policyTerms?.endDate;
    const paymentPeriodStartDate = createdPolicyBody.policyTerms?.paymentPeriodStartDate;
    const paymentPeriodEndDate = createdPolicyBody.policyTerms?.paymentPeriodEndDate;
    const insuranceTerm = dateUtils.getYearDifference(startDate, endDate);
    const premiumPeriod = dateUtils.getYearDifference(paymentPeriodStartDate, paymentPeriodEndDate) || 0;
    const paymentFrequencyCode = createdPolicyBody.basicConditions.paymentFrequency?.paymentFrequencyCode;
    const creditProgramId = createdPolicyBody.creditProgram?.creditProgramId;
    const variantCode = createdPolicyBody.basicInvestmentParameters?.variant?.variantCode;

    return {
        originDocumentId: agentAgreementId,
        originDocumentNumber: agentAgreementNumber,
        contractNumber: createdPolicyNumber,
        serviceProviderCode: partnerCode,
        calculationDate: dateUtils.dateNow(),
        loggingEnabled: true,
        calculationContext: {
            insuranceRule: ruleCode,
            insuranceProduct: productCode,
            insuranceCurrency: currencyCode,
            insuranceTerm: insuranceTerm,
            premiumPeriod: premiumPeriod,
            premiumPeriodType: paymentFrequencyCode,
            creditProgram: creditProgramId,
            variant: variantCode
        }
    };

};
