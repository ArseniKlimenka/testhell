'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { calcPremium } = require('@config-rgsl/collective-life-insurance/lib/CalculationPremiumHelper');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = additionalDataSourcesResults.GetContractFullDataDataSource.data[0].resultData.body;

    const withTarification = getValue(body, 'basicConditions.withTarification', false);
    if (!withTarification) {

        return null;
    }

    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    const paymentFrequency = getValue(body, 'basicConditions.paymentFrequency.paymentFrequencyCode');
    const risks = getValue(body, 'risks', []);
    const currency = getValue(body, 'basicConditions.currency.currencyCode');
    const contractIssueDate = getValue(body, 'basicConditions.issueDate');

    const riskData = calcPremium({ productCode, paymentFrequency, risks, currency, contractIssueDate });

    const output = {
        request: {
            risks: riskData.map(x => ({
                insuredId: getValue(input, 'id'),
                contractNumber: this.businessContext.etlServiceInput.contractNumber,
                startDate: x.startDate,
                endDate: x.endDate,
                riskCode: x.riskCode,
                amount: x.amount,
                premium: x.premium
            }))
        }
    };

    sinkExchange.premium = riskData.reduce((sum, x) => { sum += x.premium; return sum; }, 0);
    sinkExchange.amount = Math.max.apply(null, riskData.map(x => x.amount));

    return output;
};
