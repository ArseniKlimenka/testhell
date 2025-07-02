'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.claimNumber = input.data.criteria.claimNumber;

    return output;
};
