'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.contractNumbers = input.data.criteria.contractNumbers;

    return output;
};
