'use strict';

const { paymentOrderType, paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function shouldDisablePaymentCurrency(input) {

    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    const typesToDisableCurrency = [paymentOrderType.PaymentRefund];
    const type = input.context.Body.paymentOrderInformation?.paymentOrderType;
    const subtype = input.context.Body.paymentOrderInformation?.paymentOrderSubType;

    return (type &&
        typesToDisableCurrency.includes(type)) ||
        subtype === paymentOrderSubType.PIT ||
        subtype === paymentOrderSubType.EndowmentPIT ||
        isDocumentLocked;
};
