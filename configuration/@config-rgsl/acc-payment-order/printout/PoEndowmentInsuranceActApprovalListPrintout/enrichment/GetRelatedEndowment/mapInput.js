'use strict';

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                documentCode: input.endowmentNumber
            }
        }
    };

    return output;
};
