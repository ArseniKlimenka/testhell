'use strict';

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                contractNumber: input.contractNumber
            }
        }
    };

    return output;
};
