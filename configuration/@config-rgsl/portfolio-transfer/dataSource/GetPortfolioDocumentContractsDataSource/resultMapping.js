'use strict';

module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        stateCode: input.STATE,
        error: input.ERROR,
        payments: input.PAYMENTS && JSON.parse(input.PAYMENTS),
    };
};
