'use strict';

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const recipients = body.paymentAmendmentConditions.canellationRecipients ?? [];
    const partyIds = recipients.map(item => item.partyId);

    return {
        contractNumber: this.businessContext.originalDocumentNumber,
        recipientsIds: partyIds
    };
};
