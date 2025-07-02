'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.claimNumber = input.CLAIM_NUMBER;
    output.beneficiaryPartyCode = input.BENEFICIARY_PARTY_CODE;
    output.beneficiaryReasonCode = input.BENEFICIARY_REASON_CODE;

    return output;
};
