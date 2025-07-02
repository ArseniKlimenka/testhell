'use strict';

module.exports = function mapping(input) {
    return {
        input: {
            data: {
                criteria: {
                    sadNumber: input.data.sadNumber
                }
            }
        }
    };
};
