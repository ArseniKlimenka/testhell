"use strict";

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {

    const type = input.body.paymentOrderInformation.paymentOrderType;
    const subType = input.body.paymentOrderInformation.paymentOrderSubType;
    const isManual = input.body.paymentOrderInformation.isManual;
    const isCreatedFromNetting = input.body.paymentOrderInformation.isCreatedFromNetting;

    const isCollectieClaim = type === paymentOrderType.Claim && subType === paymentOrderSubType.Collective;

    if (!isCollectieClaim || isManual || isCreatedFromNetting) {

        return;
    }

    const claimBody = sinkExchange.resolveContext('claimBody');
    const claimNumber = sinkExchange.resolveContext('claimNumber');
    claimBody.claimAmounts.isPaid = true;

    return {
        body: claimBody,
        number: claimNumber
    };
};
