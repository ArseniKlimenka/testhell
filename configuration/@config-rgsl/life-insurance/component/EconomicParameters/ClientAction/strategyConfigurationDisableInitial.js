'use strict';

module.exports = function strategyConfigurationDisableInitial(input) {

    const currencyCode = input.context.currency?.currencyCode;
    const ratesOfReturn = input.context.ratesOfReturn;

    if (ratesOfReturn?.issueDateFrom || !currencyCode) {

        return true;
    }
};
