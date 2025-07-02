const { toApprovedValidation } = require('@config-rgsl/acc-payment-order/lib/paymentOrderFlowHelper');

module.exports = function rule(input) {

    return toApprovedValidation(input.body);

};
