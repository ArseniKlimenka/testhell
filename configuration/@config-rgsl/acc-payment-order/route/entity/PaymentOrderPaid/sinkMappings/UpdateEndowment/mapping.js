"use strict";

const { paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {

    const subType = input.body.paymentOrderInformation.paymentOrderSubType;
    const isManual = input.body.paymentOrderInformation.isManual;
    const isCreatedFromNetting = input.body.paymentOrderInformation.isCreatedFromNetting;

    if (subType !== paymentOrderSubType.Endowment || isManual || isCreatedFromNetting) {

        return;
    }

    const endowmentBody = sinkExchange.resolveContext('endowmentBody');
    const endowmentNumber = sinkExchange.resolveContext('endowmentNumber');

    const beneficiaries = endowmentBody.endowmentBeneficiaries;
    const recipient = input.body.recipientInformation;
    const beneficiary = beneficiaries.find(item => item.partyCode === recipient.partyCodeName && input.number === item.assignedPaymentOrderNumber);
    beneficiary.isPaid = true;

    return {
        body: endowmentBody,
        number: endowmentNumber
    };
};
