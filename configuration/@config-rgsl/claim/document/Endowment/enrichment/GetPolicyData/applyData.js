"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0 || dataSource.data.length > 1) {

        return;
    }

    const paymentVariant = dataSource.data[0].resultData.endowmentPaymentVariant;
    const paymentFrequency = dataSource.data[0].resultData.paymentFrequencyWithCode;

    if (paymentVariant) {

        input.endowmentPaymentVariant = {
            code: paymentVariant.endowmentPaymentVariantCode,
            description: paymentVariant.endowmentPaymentVariantDescription
        };
    }

    if (paymentFrequency) {

        input.endowmentPaymentFrequency = {
            code: paymentFrequency.paymentFrequencyCode,
            description: paymentFrequency.paymentFrequencyDescription
        };
    }

    const policyRisks = dataSource.data[0].resultData.items[0].attributes.risks ?? [];

    input.mainAttributes.availableRisks = policyRisks.map(risk => {

        return {
            riskCode: risk.riskCode,
            riskShortDescription: risk.riskShortDescription,
            riskInsuredSum: risk.riskInsuredSum
        };
    });

    input.endowmentAmounts = {
        contractCurrency: dataSource.data[0].resultData.items[0].attributes.currency
    };

    const insuredSumByPeriod = policyRisks.map(risk => {

        const result = {
            riskCode: risk.riskCode,
            periods: risk.riskInsuredSumByPeriod ?? []
        };

        return result;
    });

    input.mainAttributes.risksInsuredSumByPeriod = insuredSumByPeriod;
};
