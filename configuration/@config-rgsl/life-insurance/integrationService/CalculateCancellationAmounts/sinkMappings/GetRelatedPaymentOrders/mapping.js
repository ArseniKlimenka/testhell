'use strict';

module.exports = function mapping(input) {

    return {
        input: {
            data: {
                criteria: {
                    referenceNumber: input.amendmentNumber,
                    isManual: false,
                    isCreatedFromNetting: false
                }
            }
        }
    };
};
