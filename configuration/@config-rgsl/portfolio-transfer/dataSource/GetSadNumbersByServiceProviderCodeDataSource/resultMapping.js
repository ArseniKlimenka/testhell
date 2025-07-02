const { translationUtils } = require('@adinsure/runtime');

'use strict';

module.exports = function resultMapping(input) {

    return {

        sadNumber: input.SAD_NUMBER,
        sadNumber1: input.SAD_NUMBER_1,
        sadNumber2: input.SAD_NUMBER_2,
        sadNumberMag: input.SAD_NUMBER_MAG,
        sadNumberNso: input.SAD_NUMBER_NSO,
    };
};
