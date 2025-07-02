'use strict';

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                fullBic: input.BIC
            }
        }
    };

    return output;
};
