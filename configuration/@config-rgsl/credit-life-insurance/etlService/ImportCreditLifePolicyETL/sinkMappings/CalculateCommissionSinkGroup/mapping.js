const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(lineInput, sinkExchange) {

    const agentAgreementId = getValue(sinkExchange, 'createdPolicyBody.commission.agentAgreement.id');
    const agentAgreementNumber = getValue(sinkExchange, 'createdPolicyBody.commission.agentAgreement.number');
    const partnerCode = getValue(sinkExchange, 'createdPolicyBody.mainInsuranceConditions.partner.partnerCode');
    const ruleCode = getValue(sinkExchange, 'createdPolicyBody.insuranceRules.ruleCode');
    const productCode = getValue(sinkExchange, 'createdPolicyBody.mainInsuranceConditions.insuranceProduct.productCode');
    const currencyCode = getValue(sinkExchange, 'createdPolicyBody.basicConditions.currency.currencyCode');
    const startDate = getValue(sinkExchange, 'createdPolicyBody.policyTerms.startDate');
    const endDate = getValue(sinkExchange, 'createdPolicyBody.policyTerms.endDate');
    const paymentPeriodStartDate = getValue(sinkExchange, 'createdPolicyBody.policyTerms.paymentPeriodStartDate');
    const paymentPeriodEndDate = getValue(sinkExchange, 'createdPolicyBody.policyTerms.paymentPeriodEndDate');
    const insuranceTerm = dateUtils.getYearDifference(startDate, endDate);
    const premiumPeriod = dateUtils.getYearDifference(paymentPeriodStartDate, paymentPeriodEndDate) || 0;
    const paymentFrequencyCode = getValue(sinkExchange, 'createdPolicyBody.basicConditions.paymentFrequency.paymentFrequencyCode');
    const creditProgramId = getValue(sinkExchange, 'createdPolicyBody.creditProgram.creditProgramId');
    const variantCode = getValue(sinkExchange, 'createdPolicyBody.basicInvestmentParameters.variant.variantCode');

    return {
        originDocumentId: agentAgreementId,
        originDocumentNumber: agentAgreementNumber,
        contractNumber: sinkExchange.createdPolicyNumber,
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
