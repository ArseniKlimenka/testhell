"use strict";

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");
const { cancellationAmendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function mapping(input, sinkExchange) {

    const type = input.paymentOrderType;
    const subType = input.paymentOrderSubtype;
    const shouldUpdate = input.shoudlUpdateRefDoc;

    if (type !== paymentOrderType.PolicyCancellation || !!subType || !shouldUpdate) {

        return;
    }

    const cancellationBody = sinkExchange.resolveContext('cancellationBody');
    const cancellationNumber = sinkExchange.resolveContext('cancellationNumber');
    const cancellationCodeName = sinkExchange.resolveContext('cancellationCodeName');

    const canellationRecipients = cancellationBody.paymentAmendmentConditions.canellationRecipients;
    const canellationRecipient = canellationRecipients.find(item => item.partyCode === input.cancellationRecipientCode &&
        input.cnlRecipientPaymentTypeCode === item.recipientPaymentType.code &&
        !item.isPaid);

    const poNumber = sinkExchange.createdPaymentOrders
        .find(item => item.paymentOrderType === paymentOrderType.PolicyCancellation &&
            !item.paymentOrderSubtype)?.paymentOrderNumber;

    const pitPoNumber = sinkExchange.createdPaymentOrders
        .find(item => item.paymentOrderType === paymentOrderType.PolicyCancellation &&
            item.paymentOrderSubtype === paymentOrderSubType.PIT)?.paymentOrderNumber;

    canellationRecipient.assignedPaymentOrderNumber = poNumber;
    canellationRecipient.assignedPitPaymentOrderNumber = pitPoNumber;

    return {
        configurationName: cancellationCodeName,
        configurationVersion: "1",
        number: cancellationNumber,
        body: cancellationBody,
        allowOnValidationErrors: {
            all: true
        },
        allowUpdatingInStates: [cancellationAmendmentState.POCreation],
        useSinkConfOverride: true,
        allowActiveDocumentsUpdate: false
    };
};
