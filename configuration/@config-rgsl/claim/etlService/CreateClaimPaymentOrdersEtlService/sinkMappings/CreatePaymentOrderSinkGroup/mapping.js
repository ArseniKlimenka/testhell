'use strict';

module.exports = function mapping(input) {

    return {
        paymentOrderType: 'Claim',
        referenceNumber: input.claimNumber,
        beneficiaryCode: input.beneficiaryPartyCode,
        beneficiaryReasonCode: input.beneficiaryReasonCode,
        shoudlUpdateRefDoc: true
    };
};
