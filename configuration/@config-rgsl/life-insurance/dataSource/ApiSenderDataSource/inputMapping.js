'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.contractNumber = null;

    const criteria = input.data.criteria;

    if (criteria.contractNumber) {

        output.parameters.contractNumber = criteria.contractNumber;
    }

    return output;
};
