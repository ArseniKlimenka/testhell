'use strict';

module.exports = function onIsFutureContractChanged(input) {

    if (input.data.isFutureContract) {

        input.data.documentNumber = undefined;
        input.data.documentCurrency = undefined;
        input.data.initialOpenAmount = undefined;
        input.data.nettedAmount = undefined;
        input.data.nettedAmountInDocCurrency = undefined;
        input.data.exchangeRate = undefined;
    }
    else {

        input.data.initialOpenAmount = undefined;
        input.data.documentNumber = undefined;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
