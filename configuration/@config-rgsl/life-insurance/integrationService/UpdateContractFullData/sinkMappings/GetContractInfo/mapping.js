'use strict';

module.exports = function mapping(sinkInput) {

    return {
        request: {
            Number: sinkInput.contractNumber
        }
    };
};
