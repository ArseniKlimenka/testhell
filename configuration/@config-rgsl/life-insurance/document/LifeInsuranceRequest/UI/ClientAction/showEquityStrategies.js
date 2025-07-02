'use strict';

const { investmentParametersEditClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function showEquityStrategies(input, ambientProperties) {

    const changeClass = input.context.Body.changeClass;
    const isInvestmentParametersEditClassTypes = checkAvailabilitySome(investmentParametersEditClassTypes, changeClass);

    return isInvestmentParametersEditClassTypes;
};
