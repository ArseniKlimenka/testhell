'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} PaymentSuccessfullyAllocated
 * @translationKey {translationKey} AmountToAllocateIsTooHigh
 */

module.exports = async function allocate(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;
    const body = input.context.Body;

    if (body.bankStatementItem.openAmount < body.payAmountToAllocate) {
        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.AmountToAllocateIsTooHigh', 'OK', 'Cancel', ONLY_OK_BUTTON);
        return;
    }

    if (isNaN(body.payAmountToAllocate) || isNaN(body.docAmountToAllocate)) {
        throw 'Incorect amount format!';
    }

    const request = {
        method: 'post',
        url: 'api/rgsl/accounting/shared/cash-flow/allocation/allocate',
        data: {
            bankStatementItemId: body.bankStatementItem.id,
            payAmount: body.payAmountToAllocate,
            docAmount: body.docAmountToAllocate,
            referenceNo: body.document.documentNo,
            toleranceType: body.toleranceType,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.PaymentSuccessfullyAllocated', 'OK', 'Cancel', ONLY_OK_BUTTON);
    this.view.reloadEntity();
};
