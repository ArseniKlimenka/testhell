'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.accountingYear = input.YEAR_DESCRIPTION;

    return output;
};
