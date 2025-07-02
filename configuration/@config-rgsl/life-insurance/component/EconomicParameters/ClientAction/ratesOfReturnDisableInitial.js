'use strict';

module.exports = function ratesOfReturnDisableInitial(input) {

    const currencyCode = input.context.currency?.currencyCode;

    if (!currencyCode) {

        return true;
    }
};
