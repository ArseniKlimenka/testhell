"use strict";

const paymentPlanUtils = require('@config-rgsl/life-insurance/lib/paymentPlanUtils');
const { getValue, deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const configurationName = additionalDataSourcesResults.GetContractFullDataDataSource.data[0].resultData.confName;
    const body = additionalDataSourcesResults.GetContractFullDataDataSource.data[0].resultData.body;

    const dimensions = {};
    dimensions.configurationName = configurationName;

    body.risks.forEach(x => {
        x.riskInsuredSum = 0;
        x.riskPremium = 0;
    });

    sinkExchange.risks.forEach(x => {

        const risk = body.risks.find(r => r.risk.riskCode == x.riskCode);
        if (risk) {
            risk.riskInsuredSum = x.amount;
            risk.riskPremium = x.premium;
        }
    });

    paymentPlanUtils.fillPaymentPlan(body, dimensions);

    body.technicalInformation.collectivePolicyPremiumWasCalculated = true;
    body.technicalInformation.collectivePolicyTariffFactors = getCollectivePolicyTariffFactors(body);

    const result = {};
    result.body = body;
    result.number = this.businessContext.etlServiceInput.contractNumber;

    return result;
};

function getCollectivePolicyTariffFactors(body) {

    const collectivePolicyTariffFactors = {
        paymentFrequencyCode: deepCopy(getValue(body, 'basicConditions.paymentFrequency.paymentFrequencyCode')),
        insuranceTerms: deepCopy(getValue(body, 'basicConditions.insuranceTerms')),
        startDate: deepCopy(getValue(body, 'policyTerms.startDate')),
        endDate: deepCopy(getValue(body, 'policyTerms.endDate'))
    };

    return collectivePolicyTariffFactors;
}
