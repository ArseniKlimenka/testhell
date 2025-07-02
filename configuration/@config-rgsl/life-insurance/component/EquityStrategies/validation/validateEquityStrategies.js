
'use strict';

const { lifeInsuranceRequestConfigurationName } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { investmentParametersEditClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

/**
* @errorCode {errorCode} usedShareMore100
* @errorCode {errorCode} usedSumMoreRiskPremium
* @errorCode {errorCode} needToAddStrategy
*/
module.exports = function validateEquityStrategies(input, ambientProperties) {

    const validationErrors = [];

    const body = this.businessContext.rootData;
    const configurationCodeName = this?.businessContext?.configurationCodeName;
    const riskPremium = body?.basicConditions?.riskPremium;
    const equityStrategies = body?.equityStrategies || [];
    const usedShare = round(equityStrategies.reduce((acc, v) => acc += v.share, 0), 4);
    const usedSum = round(equityStrategies.reduce((acc, v) => acc += v.sum, 0), 2);

    const isLifeInsuranceRequest = configurationCodeName == lifeInsuranceRequestConfigurationName;
    const lifeInsuranceRequestChangeClass = body?.changeClass ?? [];
    const isInvestmentParametersEdit = checkAvailabilitySome(investmentParametersEditClassTypes, lifeInsuranceRequestChangeClass);
    const isLifeInsuranceRequestInvestmentParametersEdit = isLifeInsuranceRequest && isInvestmentParametersEdit;

    /*
    if (equityStrategies.length == 0 && (!isLifeInsuranceRequest || isLifeInsuranceRequestInvestmentParametersEdit)) {
        validationErrors.push({
            errorCode: "needToAddStrategy",
            errorDataPath: '/equityStrategies'
        });
    }
    */

    if (usedShare > 1) {
        validationErrors.push({
            errorCode: "usedShareMore100",
            errorDataPath: '/equityStrategies'
        });
    }

    if (usedSum > riskPremium) {
        validationErrors.push({
            errorCode: "usedSumMoreRiskPremium",
            errorDataPath: '/equityStrategies'
        });
    }

    return validationErrors;

};
