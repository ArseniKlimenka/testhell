'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.insuranceTermsYearName = input.NAME;
    output.insuranceTermsYearCode = input.CODE;
    output.insuranceTermsYearDescription = input.DESCRIPTION;

    return output;
};
