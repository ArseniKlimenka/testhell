'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.endowmentNumber = input.ENDOWMENT_NUMBER;
    output.beneficiaryPartyCode = input.BENEFICIARY_PARTY_CODE;
    output.beneficiaryPaymentTypeCode = input.BENEFICIARY_PT_CODE;

    return output;
};
