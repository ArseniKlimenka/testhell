'use strict';

const { paymentOrderType, paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function shouldShowNettingTab(input) {

    const typesToShow = [paymentOrderType.Claim, paymentOrderType.PolicyCancellation];
    const type = input.context.Body.paymentOrderInformation?.paymentOrderType;
    const subtype = input.context.Body.paymentOrderInformation?.paymentOrderSubType;

    return type && typesToShow.includes(type) && subtype !== paymentOrderSubType.PIT;
};
