'use strict';

const { shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isCalculationDisabled(input) {

    if (this.view.areAllElementsDisabled() || shouldDisableSaveableContract(input, this.view)) {

        return true;
    }

    return input.rootContext.ConfigurationCodeName === 'CreditLifeInsurancePolicy';
};
