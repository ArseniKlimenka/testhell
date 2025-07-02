"use strict";

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {

    const type = input.paymentOrderType;
    const subType = input.paymentOrderSubtype;
    const shouldUpdate = input.shoudlUpdateRefDoc;

    if (type !== paymentOrderType.Claim || subType !== paymentOrderSubType.Endowment || !shouldUpdate) {

        return;
    }

    const endowmentBody = sinkExchange.resolveContext('endowmentBody');
    const endowmentNumber = sinkExchange.resolveContext('endowmentNumber');

    const beneficiaries = endowmentBody.endowmentBeneficiaries;
    const beneficiary = beneficiaries.find(item => item.partyCode === input.beneficiaryCode &&
        item.beneficiaryPaymentType.code === input.beneficiaryPaymentTypeCode &&
        !item.isPaid);
    const poNumber = sinkExchange.createdPaymentOrders
        .find(item => item.paymentOrderType === paymentOrderType.Claim &&
            item.paymentOrderSubtype === paymentOrderSubType.Endowment)?.paymentOrderNumber;
    const pitPoNumber = sinkExchange.createdPaymentOrders
        .find(item => item.paymentOrderType === paymentOrderType.Claim &&
            item.paymentOrderSubtype === paymentOrderSubType.EndowmentPIT)?.paymentOrderNumber;
    beneficiary.assignedPaymentOrderNumber = poNumber;
    beneficiary.assignedPitPaymentOrderNumber = pitPoNumber;

    return {
        body: endowmentBody,
        number: endowmentNumber
    };
};
