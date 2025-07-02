'use strict';

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                cancellationNumber: input.cancellationAmendmentNumber
            }
        }
    };

    return output;
};
