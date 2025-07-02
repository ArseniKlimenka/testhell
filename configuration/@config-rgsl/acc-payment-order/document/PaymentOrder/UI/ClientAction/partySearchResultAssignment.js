'use strict';

const { poTypesHaveDescriptionCode, paymentOrderType, paymentDescriptionCode } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');

module.exports = function partySearchResultAssignment(input) {

    const lookupSelection = input.getLookupSelection();
    const body = input.context.Body;

    if (lookupSelection && lookupSelection[0] && lookupSelection[0].resultData && lookupSelection[0].metadata) {

        body.recipientInformation.partyFullName = lookupSelection[0].resultData.fullName;
        body.recipientInformation.partyCodeName = lookupSelection[0].metadata.code;
        body.recipientInformation.partyType = lookupSelection[0].metadata.configurationName;
        body.recipientInformation.innNumber = lookupSelection[0].resultData.INNKIO;
        body.recipientInformation.kppNumber = lookupSelection[0].resultData.KPP;
        body.recipientInformation.isNonResident = lookupSelection[0].resultData.isNonResident;

        onRecipientChanged(body);
    }
};

function onRecipientChanged(input) {

    const poType = input.paymentOrderInformation?.paymentOrderType;
    const recipientPartyCode = input.recipientInformation?.partyCodeName;
    const isRecipientNonResident = input.recipientInformation?.isNonResident;
    const paymentDescription = input.paymentOrderAmounts?.paymentDescription;

    if (recipientPartyCode && paymentDescription && poTypesHaveDescriptionCode.includes(poType)) {

        const code = poType === paymentOrderType.PaymentRefund ? paymentDescriptionCode.nonResidentPaymentRefund : paymentDescriptionCode.nonResident;
        const codeIndex = paymentDescription.indexOf(code);

        if (isRecipientNonResident && codeIndex < 0) {

            input.paymentOrderAmounts.paymentDescription = `${code} ${paymentDescription}`;
        }
        else if (!isRecipientNonResident && codeIndex >= 0) {

            const pattern = /(VO70115)|(VO20800)/;
            input.paymentOrderAmounts.paymentDescription = paymentDescription.replace(pattern, '').trim();
        }
    }
}
