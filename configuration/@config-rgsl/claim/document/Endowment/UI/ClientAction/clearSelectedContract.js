'use strict';

module.exports = function clearSelectedContract(input) {

    const contractNumber = input.data.Body.mainAttributes?.contract?.number;

    if (contractNumber) {

        delete input.data.Body.mainAttributes.contract.number;
        delete input.data.Body.mainAttributes.contract.configurationName;
        delete input.data.Body.mainAttributes.availableRisks;
        delete input.data.Body.mainAttributes.selectedRisk;
    }
};
