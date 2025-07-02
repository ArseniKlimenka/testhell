'use strict';

module.exports = function mapping(input) {
    return {
        input: {
            data: {
                criteria: {
                    contractNumbers: input.contractNumbers,
                    postingDateTo: input.postingDateTo,
                }
            }
        }
    };
};
