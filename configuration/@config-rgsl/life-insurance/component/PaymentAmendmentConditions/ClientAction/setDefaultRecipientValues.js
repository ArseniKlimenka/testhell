'use strict';
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = async function setDefaultRecipientValues(input, ambientProperties) {

    input.affectedRow.recipientReason = amendmentConstants.defaultCancellationRecipientReason;
    input.affectedRow.recipientPaymentType = amendmentConstants.defaultCancellationRecipientPaymentType;
    input.affectedRow.amountToPayPercetage = 1;

    return true;
};
