'use strict';

const { didPaymentClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function showEquityDidPayment(input, ambientProperties) {

    const changeClass = input.context.Body.changeClass;
    const isDidPaymentClassTypes = checkAvailabilitySome(didPaymentClassTypes, changeClass);

    return isDidPaymentClassTypes;
};
