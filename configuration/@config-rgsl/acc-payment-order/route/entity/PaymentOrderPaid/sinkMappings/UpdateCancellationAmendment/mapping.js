"use strict";

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");
const { cancellationAmendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function mapping(input, sinkExchange) {

    const type = input.body.paymentOrderInformation.paymentOrderType;
    const subType = input.body.paymentOrderInformation.paymentOrderSubType;
    const isManual = input.body.paymentOrderInformation.isManual;
    const isCreatedFromNetting = input.body.paymentOrderInformation.isCreatedFromNetting;

    if (type !== paymentOrderType.PolicyCancellation || subType || isManual || isCreatedFromNetting) {

        return;
    }

    const cancellationBody = sinkExchange.resolveContext('cancellationBody');
    const cancellationNumber = sinkExchange.resolveContext('cancellationNumber');
    const cancellationCodeName = sinkExchange.resolveContext('cancellationCodeName');

    const canellationRecipients = cancellationBody.paymentAmendmentConditions.canellationRecipients;
    const recipient = input.body.recipientInformation;
    const canellationRecipient = canellationRecipients.find(item => item.partyCode === recipient.partyCodeName && input.number === item.assignedPaymentOrderNumber);
    canellationRecipient.isPaid = true;

    return {
        configurationName: cancellationCodeName,
        configurationVersion: "1",
        number: cancellationNumber,
        body: cancellationBody,
        allowOnValidationErrors: {
            all: true
        },
        allowUpdatingInStates: [cancellationAmendmentState.SentToPayment],
        useSinkConfOverride: true,
        allowActiveDocumentsUpdate: false
    };
};
