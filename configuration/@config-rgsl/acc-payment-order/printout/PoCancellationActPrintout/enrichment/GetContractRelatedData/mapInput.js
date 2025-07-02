'use strict';

module.exports = function mapping(input) {

    return {
        contractNumber: input.contractNumber,
        contractAmendmentNumber: input.contractAmendmentNumber,
        recipientPartyCode: input.recipientPartyCode
    };
};
