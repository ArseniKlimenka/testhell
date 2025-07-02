'use strict';

const { bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');
const { autoAllocatePayments } = require('@config-rgsl/acc-cash-flow/lib/autoAllocatePayments');

/**
 * @translationKey {translationKey} OnlyPartiallyAndNotAllocatedPaymentCouldBeAutoAllocated
 */

module.exports = async function autoAllocatePaymentOfSelected(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;

    if (!input.context.selection.every(item => item.resultData.paymentStatusId === bankStatementItemStatusId.NOT_ALLOCATED ||
        item.resultData.paymentStatusId === bankStatementItemStatusId.PARTIALLY_ALLOCATED)) {
        ambientProperties.services.confirmationDialog.showError(ambientProperties.configurationCodeName.toUpperCase() + '.OnlyPartiallyAndNotAllocatedPaymentCouldBeAutoAllocated', "OK", "Cancel", ONLY_OK_BUTTON);
        return;
    }

    const itemIds = input.context.selection.map(i => i.resultData.bankStatementItemId);

    await autoAllocatePayments(itemIds, ambientProperties, this.view);

};
