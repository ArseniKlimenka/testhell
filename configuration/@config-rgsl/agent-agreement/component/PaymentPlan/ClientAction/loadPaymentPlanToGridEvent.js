'use strict';

const { loadPaymentPlanToGrid } = require('@config-rgsl//life-insurance/lib/paymentPlanUtils');

module.exports = async function loadPaymentPlanToGridEvent(input, ambientProperties) {

    loadPaymentPlanToGrid(input, ambientProperties, this);
};
