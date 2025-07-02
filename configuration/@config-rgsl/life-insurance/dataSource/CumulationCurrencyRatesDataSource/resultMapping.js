'use strict';

module.exports = function resultMapping(input) {

    return {
        id: input.ID,
        currencyCode: input.CURRENCY_CODE,
        currencyRate: input.CURRENCY_RATE,
        activeFrom: input.ACTIVE_FROM,
        activeTo: input.ACTIVE_TO
    };
};
