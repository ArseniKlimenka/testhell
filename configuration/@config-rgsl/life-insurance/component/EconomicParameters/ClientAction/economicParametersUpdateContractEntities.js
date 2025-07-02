'use strict';

const { updateEconomicParameters } = require('@config-rgsl/contract/lib/contractEntityHelper');

module.exports = async function economicParametersUpdateContractEntities(input, ambientProperties) {

    const productConfigurationNumber = input.context.Number;
    const productCode = input.data?.mainConditions?.insuranceProduct?.productCode;

    const selectedEconomicParameters = input.context.selection ?? [];
    const selectedRules = selectedEconomicParameters.map(i => i.ruleNum);
    const contractNumbers = [];

    updateEconomicParameters(input, ambientProperties, this, productConfigurationNumber, productCode, selectedRules, contractNumbers);
};
