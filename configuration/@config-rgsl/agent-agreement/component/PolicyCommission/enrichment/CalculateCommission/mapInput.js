const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const agentAgreementId = input.agentAgreement?.id;
    const agentAgreementNumber = input.agentAgreement?.number;
    const docNumber = this.businessContext.documentNumber || "NO_NUMBER";

    if (!agentAgreementId || !agentAgreementNumber) {

        return;
    }

    if (this.businessContext.configurationCodeName == 'CollectiveLifeInsurancePolicy' &&
       (!body.policyTerms.startDate || !body.policyTerms.endDate)) {

        return;
    }

    const output = {
        data: {
            originDocumentId: agentAgreementId,
            originDocumentNumber: agentAgreementNumber,
            contractNumber: docNumber,
            serviceProviderCode: body.mainInsuranceConditions?.partner?.partnerCode,
            calculationDate: body.amendmentData?.portfolioMovementAmendmentData?.mainAttributes?.amendmentEffectiveDate ?? body.policyTerms?.startDate,
            loggingEnabled: false,
            calculationContext: {
                insuranceRule: body.insuranceRules?.ruleCode || 'NoRule',
                insuranceProduct: body.mainInsuranceConditions?.insuranceProduct?.productCode,
                insuranceCurrency: body.basicConditions?.currency?.currencyCode,
                insuranceTerm: dateUtils.getYearDifference(body.policyTerms.startDate, dateUtils.addDays(body.policyTerms.endDate, 1)),
                premiumPeriod: dateUtils.getYearDifference(body.policyTerms.paymentPeriodStartDate, dateUtils.addDays(body.policyTerms.paymentPeriodEndDate, 1)) || 0,
                premiumPeriodType: body.basicConditions?.paymentFrequency?.paymentFrequencyCode,
                creditProgram: body.creditProgram?.creditProgramId,
                variant: body.basicInvestmentParameters?.variant?.variantCode,
                manualRule: body.manualRule ?? body.commission.manualRule
            }
        }
    };

    return output;
};
