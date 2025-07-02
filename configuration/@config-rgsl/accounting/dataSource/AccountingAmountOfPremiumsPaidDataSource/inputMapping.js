'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.contractNumber = null;
    output.parameters.accountingYear = null;

    if (input.data.criteria.contractNumber) {
        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.accountingYear) {
        output.parameters.accountingYear = input.data.criteria.accountingYear;
    }

    return output;
};
