'use strict';

module.exports = function basicInvestmentParametersDisableInitial(input) {

    const currencyCode = input.context.currency?.currencyCode;

    if (!currencyCode) {

        return true;
    }
};
