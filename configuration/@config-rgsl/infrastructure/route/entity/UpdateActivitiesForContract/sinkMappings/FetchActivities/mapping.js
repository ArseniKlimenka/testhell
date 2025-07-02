'use strict';

module.exports = function mapping(input) {
    return {
        input: {
            data: {
                criteria: {
                    contractNumber: input.number,
                    showVerification: true,
                }
            }
        }
    };
};
