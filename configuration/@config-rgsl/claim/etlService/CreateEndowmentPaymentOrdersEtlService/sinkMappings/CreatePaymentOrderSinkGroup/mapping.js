'use strict';

module.exports = function mapping(input) {

    return {
        paymentOrderType: 'Claim',
        paymentOrderSubtype: 'Endowment',
        referenceNumber: input.endowmentNumber,
        beneficiaryCode: input.beneficiaryPartyCode,
        beneficiaryPaymentTypeCode: input.beneficiaryPaymentTypeCode,
        shoudlUpdateRefDoc: true
    };
};
