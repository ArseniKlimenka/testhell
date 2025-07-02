'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.documentNumber = undefined;
    output.parameters.beneficiaryCode = undefined;

    if (input.data.criteria.documentNumber) {

        output.parameters.documentNumber = input.data.criteria.documentNumber;
    }

    if (input.data.criteria.beneficiaryCode) {

        output.parameters.beneficiaryCode = input.data.criteria.beneficiaryCode;
    }

    return output;
};
