'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            claimNumber: input.data.criteria.claimNumber
        }
    };

    return output;
};
