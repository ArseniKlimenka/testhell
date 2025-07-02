'use strict';

module.exports = function onEditFixedEchangeRateChanged(input) {

    const isEditEnabled = input.data.editFixedExchangeRate ?? false;

    if (isEditEnabled) {

        const currentValue = input.data.fixedExchangeRate;
        input.data.fixedExchangeRateOriginalValue = currentValue;
        input.data.useFixedExchangeRate = true;
    }
    else {

        const originalValue = input.data.fixedExchangeRateOriginalValue;
        input.data.fixedExchangeRate = originalValue;
    }

    this.rebindComponent();
};
