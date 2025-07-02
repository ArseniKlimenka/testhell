"use strict";

const { endowmentRisks } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0 || dataSource.data.length > 1) {

        return;
    }

    const resultData = dataSource.data[0].resultData;
    const metadata = dataSource.data[0].metadata;

    const contractConfigurationName = metadata.configurationName;
    const contractConfigurationVersion = metadata.configurationVersion?.toString();
    const contractStateCode = resultData.stateCode;
    const contractStateDescription = resultData.stateCodeDescription;

    let policyRisks = resultData.items[0].attributes.risks || [];
    policyRisks = policyRisks.filter(item => !endowmentRisks.includes(item.riskCode));

    input.mainAttributes.availableRisks = policyRisks.map(risk => {

        return {
            riskCode: risk.riskCode,
            riskShortDescription: risk.riskShortDescription,
            riskInsuredSum: risk.riskInsuredSum,
            risksGroup: risk.risksGroup
        };
    });

    if (!input.claimAmounts) {

        input.claimAmounts = {};
    }

    input.claimAmounts.contractCurrency = resultData.items[0].attributes.currency;

    const insuredSumByPeriod = policyRisks.map(risk => {

        const result = {
            riskCode: risk.riskCode,
            periods: risk.riskInsuredSumByPeriod || []
        };

        return result;
    });

    const insuranceRulesCode = resultData.insuranceRules.ruleCode;
    const insuranceRulesDescription = resultData.insuranceRules.ruleDescription;

    input.insuranceRules = {};
    input.insuranceRules.ruleCode = insuranceRulesCode;
    input.insuranceRules.ruleDescription = insuranceRulesDescription;

    input.mainAttributes.risksInsuredSumByPeriod = insuredSumByPeriod;
    input.mainAttributes.contract.configurationName = contractConfigurationName;
    input.mainAttributes.contract.configurationVersion = contractConfigurationVersion;
    input.mainAttributes.contract.stateCode = contractStateCode;
    input.mainAttributes.contract.stateDescription = contractStateDescription;
};
