'use strict';

module.exports = function clearPaymentFrequency(input) {

    const paymentFerequency = input.context.Body.endowmentPaymentFrequency;

    if (paymentFerequency) {

        delete input.context.Body.endowmentPaymentFrequency;
    }
};
