'use strict';

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                endowmentNumber: input.endowmentNumber
            }
        }
    };

    return output;
};
