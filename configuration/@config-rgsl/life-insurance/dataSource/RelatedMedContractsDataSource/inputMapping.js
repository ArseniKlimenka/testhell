'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};

    if (input.data.criteria.contractNumber) {
        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    return output;
};
