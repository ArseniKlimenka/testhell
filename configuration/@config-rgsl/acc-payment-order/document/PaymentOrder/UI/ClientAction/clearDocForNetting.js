'use strict';

module.exports = function clearDocForNetting(input, ambientProperties) {

    input.data.documentCurrency = undefined;
    input.data.documentNumber = undefined;
    input.data.exchangeRate = undefined;
    input.data.initialOpenAmount = undefined;
    input.data.nettedAmount = undefined;
    input.data.nettedAmountInDocCurrency = undefined;
};
