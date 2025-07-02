'use strict';

const { bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} NotAllowedStatusToBeRestored
 * @translationKey {translationKey} PaymentsSuccessfullyRestored
 */

module.exports = async function restorePaymentOfSelected(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;
    const allowedToRestoreStatusIds = [
        bankStatementItemStatusId.CANCELLED,
        bankStatementItemStatusId.ALLOCATED_TO_REGISTRY,
    ];

    if (input.context.selection.some(item => !allowedToRestoreStatusIds.includes(item.resultData.paymentStatusId))) {
        ambientProperties.services.confirmationDialog.showError(ambientProperties.configurationCodeName.toUpperCase() + '.NotAllowedStatusToBeRestored', "OK", "Cancel", ONLY_OK_BUTTON);
        return;
    }

    const itemIds = input.context.selection.map(i => i.resultData.bankStatementItemId);

    const request = {
        method: 'post',
        url: `api/rgsl/accounting/shared/cash-flow/bank-statement/restore`,
        data: {
            BankStatementItemIds: itemIds,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.PaymentsSuccessfullyRestored', "OK", "Cancel", ONLY_OK_BUTTON);
    this.view.reloadEntity();
};
