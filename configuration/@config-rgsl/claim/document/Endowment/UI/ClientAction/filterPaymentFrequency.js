'use strict';

const { endowmentPaymentVariant, endowmentPaymentFrequency } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function filterPaymentFrequency(input) {

    const currentItems = input.items;
    let filteredItems = currentItems;
    const paymentVariant = input.rootContext.Body.endowmentPaymentVariant;

    if (paymentVariant && paymentVariant.code === endowmentPaymentVariant.single) {

        filteredItems = currentItems.filter(item => item.value.code === endowmentPaymentFrequency.single);
    }
    else if (paymentVariant && paymentVariant && paymentVariant !== endowmentPaymentVariant.single) {

        filteredItems = currentItems.filter(item => item.value.code !== endowmentPaymentFrequency.single);
    }
    else {

        filteredItems = [];
    }

    return filteredItems;
};
