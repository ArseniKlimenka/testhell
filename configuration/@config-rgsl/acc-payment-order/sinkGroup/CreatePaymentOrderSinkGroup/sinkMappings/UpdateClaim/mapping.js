"use strict";

const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {

    const type = input.paymentOrderType;
    const subType = input.paymentOrderSubtype;
    const shouldUpdate = input.shoudlUpdateRefDoc;

    if (type !== paymentOrderType.Claim || !!subType || !shouldUpdate) {

        return;
    }

    const claimBody = sinkExchange.resolveContext('claimBody');
    const claimNumber = sinkExchange.resolveContext('claimNumber');

    const beneficiaries = claimBody.claimBeneficiaries;
    const beneficiary = beneficiaries.find(item => item.partyCode === input.beneficiaryCode
        && item.beneficiaryReason.code === input.beneficiaryReasonCode
        && !item.isPaid);
    const poNumber = sinkExchange.createdPaymentOrders
        .find(item => item.paymentOrderType === paymentOrderType.Claim && !item.paymentOrderSubtype).paymentOrderNumber;
    beneficiary.assignedPaymentOrderNumber = poNumber;

    return {
        body: claimBody,
        number: claimNumber
    };
};
