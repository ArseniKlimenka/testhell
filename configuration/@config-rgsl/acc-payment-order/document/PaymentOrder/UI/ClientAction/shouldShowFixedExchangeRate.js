'use strict';

const { paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function shouldShowFixedExchangeRate(input) {

    const subtype = input.context.Body.paymentOrderInformation?.paymentOrderSubType;
    return subtype !== paymentOrderSubType.PIT && subtype !== paymentOrderSubType.EndowmentPIT;
};
