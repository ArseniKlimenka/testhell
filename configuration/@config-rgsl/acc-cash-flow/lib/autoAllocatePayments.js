const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} PaymentsSuccessfullyAutoAllocated
 */

async function autoAllocatePayments(itemIds, ambientProperties, currentView) {

    const ONLY_OK_BUTTON = 1;
    const translate = ambientProperties.services.translate.getSync;

    const request = {
        method: 'post',
        url: 'api/rgsl/accounting/shared/cash-flow/auto-allocation/auto-allocate',
        data: {
            bankStatementItemIds: itemIds,
        }
    };

    let result;
    try {
        currentView.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        currentView.stopBlockingUI();
    }

    const successText = translate(ambientProperties.configurationCodeName.toUpperCase(), 'PaymentsSuccessfullyAutoAllocated');
    const items = result.allocationResponses.map(a => a.bankStatementItemNo + ' -> ' + a.referenceNo + ': ' + (a.allocationError ?? successText));
    const msg = items.join('<br />');

    await ambientProperties.services.confirmationDialog.showNotification(msg, 'OK', 'Cancel', ONLY_OK_BUTTON);
}

module.exports = {
    autoAllocatePayments
};
