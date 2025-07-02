'use strict';

const { bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} OnlyNotAllocatedPaymentCouldBeCancelled
 * @translationKey {translationKey} PaymentsSuccessfullyCancelled
 */

module.exports = async function cancelPaymentOfSelected(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;

    if (input.context.selection.some(item => item.resultData.paymentStatusId !== bankStatementItemStatusId.NOT_ALLOCATED)) {
        ambientProperties.services.confirmationDialog.showError(ambientProperties.configurationCodeName.toUpperCase() + '.OnlyNotAllocatedPaymentCouldBeCancelled', "OK", "Cancel", ONLY_OK_BUTTON);
        return;
    }

    const itemIds = input.context.selection.map(i => i.resultData.bankStatementItemId);

    const request = {
        method: 'post',
        url: `api/rgsl/accounting/shared/cash-flow/bank-statement/cancel`,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.PaymentsSuccessfullyCancelled', "OK", "Cancel", ONLY_OK_BUTTON);
    this.view.reloadEntity();
};
