const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} PaymentDescriptionChanged
 */

module.exports = async function updatePaymentDescriptionOfSelected(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;

    if (!validInput(input)) {
        return;
    }
    const { dialogContext } = input.context;
    const { context } = input;

    const itemIds = input.rootContext.selection.map(_ => _.resultData.bankStatementItemId);

    //  Request for correcting reference number
    const requestCorrect = {
        method: 'POST',
        url: 'api/rgsl/accounting/shared/cash-flow/bank-statement/update-payment-description',
        data: {
            bankStatementItemIds: itemIds,
            newPaymentDescription: context.Body.paymentDescription,
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(requestCorrect);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.PaymentDescriptionChanged', 'OK', 'Cancel', ONLY_OK_BUTTON);

    dialogContext.outputContext.success = true;
    dialogContext.closeDialog();
};

/**
 * Checks if input is valid, and if exactly one item was selected
 * @param {*} input - standard client action input
 */
function validInput(input) {

    if (!input) {
        throw Error('Missing input to match payment');
    }
    if (!input.rootContext) {
        throw Error('Missing context to match existing payment description');
    }
    if (input.rootContext.selection.length === 0) {
        throw Error('One or more items must be selected.');
    }
    return true;
}
