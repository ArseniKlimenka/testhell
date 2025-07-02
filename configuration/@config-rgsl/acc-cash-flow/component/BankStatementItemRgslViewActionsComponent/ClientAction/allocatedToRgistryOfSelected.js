'use strict';

const { bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} OnlyNotAllocatedPaymentCouldBeAllocatedToRgistry
 * @translationKey {translationKey} PaymentsSuccessfullyAllocatedToRegistry
 */

module.exports = async function allocatedToRgistryOfSelected(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;

    if (input.context.selection.some(item => item.resultData.paymentStatusId !== bankStatementItemStatusId.NOT_ALLOCATED)) {
        ambientProperties.services.confirmationDialog.showError(ambientProperties.configurationCodeName.toUpperCase() + '.OnlyNotAllocatedPaymentCouldBeAllocatedToRgistry', 'OK', 'Cancel', ONLY_OK_BUTTON);
        return;
    }

    const itemIds = input.context.selection.map(i => i.resultData.bankStatementItemId);

    const request = {
        method: 'post',
        url: 'api/rgsl/accounting/shared/cash-flow/bank-statement/set-status-allocated-to-registry',
        data: {
            bankStatementItemIds: itemIds,
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.PaymentsSuccessfullyAllocatedToRegistry', 'OK', 'Cancel', ONLY_OK_BUTTON);
    this.view.reloadEntity();
};
