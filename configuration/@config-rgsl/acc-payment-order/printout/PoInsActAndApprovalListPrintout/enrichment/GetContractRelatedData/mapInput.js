'use strict';

module.exports = function mapping(input) {

    return {
        contractNumber: input.contractNumber,
        claimNumber: input.claimNumber,
        recipientPartyCode: input.recipientPartyCode,
        paymentAmount: input.paymentAmount,
        hasNetting: input.hasNetting,
        isFullNetting: input.isFullNetting,
        nettedDocuments: input.nettedDocuments
    };
};
