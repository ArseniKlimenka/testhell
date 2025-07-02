'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.contractNumber = undefined;

    if (input.data.criteria.contractNumber) {

        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    return output;
};
