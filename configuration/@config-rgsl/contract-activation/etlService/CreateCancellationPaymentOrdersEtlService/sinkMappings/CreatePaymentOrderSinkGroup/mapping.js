'use strict';

module.exports = function mapping(input) {

    return {
        paymentOrderType: 'PolicyCancellation',
        referenceNumber: input.contractNumber,
        cancellationNumber: input.amendmentNumber,
        cancellationRecipientCode: input.recipientPartyCode,
        cnlRecipientPaymentTypeCode: input.recipientPaymentTypeCode,
        shoudlUpdateRefDoc: true
    };
};
