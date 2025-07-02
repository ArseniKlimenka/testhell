const { refundablePaymentStatuses } = require('@config-rgsl/acc-cash-flow/lib/constantsAndEnums');

module.exports = function enableRefundButtonOnSelection(input) {

    if (input.context.selection &&
        input.context.selection.length > 0 &&
        input.context.selection.every(item => refundablePaymentStatuses.includes(item.resultData.paymentStatusId))) {
        this.enableElement();
    }
    else { this.disableElement(); }
};
