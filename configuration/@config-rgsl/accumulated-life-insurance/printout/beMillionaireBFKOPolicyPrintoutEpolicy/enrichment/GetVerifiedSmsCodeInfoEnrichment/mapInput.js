'use strict';

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                referenceNo: input.policy.number,
            }
        }
    };

    return output;
};
