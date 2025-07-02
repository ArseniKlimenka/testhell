'use strict';

module.exports = function mapping(input) {

    return {
        contractNumber: input.originalDocumentNumber,
        stateCode: input.state,
    };
};
