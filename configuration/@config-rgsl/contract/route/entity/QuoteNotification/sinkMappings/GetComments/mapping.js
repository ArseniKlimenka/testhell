'use strict';

module.exports = function mapping(input) {

    const contractNumber = input.number;

    const output = {
        input: {
            data: {
                criteria: {
                    contractNumber: contractNumber
                }
            }
        }
    };

    return output;
};
