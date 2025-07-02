'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {
        claimNumber: null
    };

    if (input.data.criteria.claimNumber) {

        output.parameters.claimNumber = input.data.criteria.claimNumber;
    }

    return output;
};
