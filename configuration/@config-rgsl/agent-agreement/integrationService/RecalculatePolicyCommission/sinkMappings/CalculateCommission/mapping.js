'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input, sinkExchange) {

    const docsToUpdate = sinkExchange.resolveContext('docsToUpdate');

    if (!docsToUpdate || docsToUpdate.lengnth === 0) {

        throw 'no versions to update!';
    }

    const baseDocument = docsToUpdate.find(d => d.seq === 0);
    const baseDocumentBody = baseDocument.body;

    const aaData = sinkExchange.resolveContext('aaData');
    const existingAaData = baseDocumentBody.commission?.agentAgreement;


    const agentAgreementId = aaData?.id ?? existingAaData?.id;
    const agentAgreementNumber = aaData?.number ?? existingAaData?.number;
    const partnerCode = baseDocumentBody.mainInsuranceConditions.partner.partnerCode;

    if (!agentAgreementId || !agentAgreementNumber) {

        throw 'Для выбранного договора страхования не указан агентский договор!';
    }

    return {
        request: {
            OriginDocumentId: agentAgreementId,
            OriginDocumentNumber: agentAgreementNumber,
            ContractNumber: baseDocument.number,
            ServiceProviderCode: partnerCode,
            CalculationDate: baseDocumentBody.policyTerms.startDate,
            LoggingEnabled: true,
            CalculationContext: {
                InsuranceRule: baseDocumentBody.insuranceRules?.ruleCode || 'NoRule',
                InsuranceProduct: baseDocumentBody.mainInsuranceConditions.insuranceProduct.productCode,
                InsuranceCurrency: baseDocumentBody.basicConditions.currency.currencyCode,
                InsuranceTerm: dateUtils.getYearDifference(baseDocumentBody.policyTerms.startDate, dateUtils.addDays(baseDocumentBody.policyTerms.endDate, 1)),
                PremiumPeriod: dateUtils.getYearDifference(baseDocumentBody.policyTerms.paymentPeriodStartDate, dateUtils.addDays(baseDocumentBody.policyTerms.paymentPeriodEndDate, 1)) || 0,
                PremiumPeriodType: baseDocumentBody.basicConditions.paymentFrequency.paymentFrequencyCode,
                CreditProgram: baseDocumentBody.creditProgram?.creditProgramId,
                Variant: baseDocumentBody.basicInvestmentParameters?.variant?.variantCode
            }
        }
    };
};

