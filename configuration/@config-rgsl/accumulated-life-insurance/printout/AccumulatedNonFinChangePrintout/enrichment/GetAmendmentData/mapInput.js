'use strict';

module.exports = function mapping(input) {

    return {
        data: {
            criteria: {
                amendmentNumber: input.amendmentNumber
            }
        }
    };
};
