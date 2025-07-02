'use strict';

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                code: input.riskCode
            }
        }
    };

    return output;
};
