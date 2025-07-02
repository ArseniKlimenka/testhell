'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function paymentFrequencyFilter(input, ambientProperties) {

    const paymentFrequencies = input.items;

    const uniqueProductConfPaymentFrequencies = input.rootContext.ClientViewModel?.uniqueProductConfPaymentFrequencies ?? [];

    const availablePaymentFrequencies = paymentFrequencies.filter(i => uniqueProductConfPaymentFrequencies.includes(i.paymentFrequencyCode));

    return availablePaymentFrequencies;
};
