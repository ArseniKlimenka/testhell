'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { paymentOrderType} = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function isRecipientEnabled(input) {

    if (!isSaveOperationAvailable(this.view)) {

        return false;
    }

    const poType = input.context.Body.paymentOrderInformation?.paymentOrderType;

    if (poType === paymentOrderType.Claim) {

        return false;
    }

    return true;
};
