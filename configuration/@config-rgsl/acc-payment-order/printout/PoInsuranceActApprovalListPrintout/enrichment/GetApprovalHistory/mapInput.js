'use strict';

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                documentNumber: input.claimNumber
            }
        }
    };

    return output;
};
