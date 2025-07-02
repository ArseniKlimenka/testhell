"use strict";

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {

    const type = input.body.paymentOrderInformation.paymentOrderType;
    const subType = input.body.paymentOrderInformation.paymentOrderSubType;
    const isManual = input.body.paymentOrderInformation.isManual;
    const isCreatedFromNetting = input.body.paymentOrderInformation.isCreatedFromNetting;

    const isClaim = type === paymentOrderType.Claim && !subType;

    if (!isClaim || isManual || isCreatedFromNetting) {

        return;
    }

    const claimBody = sinkExchange.resolveContext('claimBody');
    const claimNumber = sinkExchange.resolveContext('claimNumber');

    const beneficiaries = claimBody.claimBeneficiaries;
    const recipient = input.body.recipientInformation;
    const beneficiary = beneficiaries.find(item => item.partyCode === recipient.partyCodeName && input.number === item.assignedPaymentOrderNumber);
    beneficiary.isPaid = true;

    return {
        body: claimBody,
        number: claimNumber
    };
};
