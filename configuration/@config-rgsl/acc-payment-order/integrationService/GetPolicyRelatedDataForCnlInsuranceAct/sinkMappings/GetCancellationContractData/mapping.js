'use strict';

module.exports = function mapping(input) {

    const output = {
        input: {
            data: {
                criteria: {
                    contractNumber: input.contractAmendmentNumber
                }
            }
        }
    };

    return output;
};
