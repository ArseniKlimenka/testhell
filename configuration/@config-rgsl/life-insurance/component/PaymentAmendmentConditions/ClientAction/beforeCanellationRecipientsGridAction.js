'use strict';

/**
 * @translationKey {translationKey} UnableToAddDuplicatedRecipient
 */
module.exports = function beforeCanellationRecipientsGridAction(input, ambientProperties) {

    if (input.operationType === 'Add' || input.operationType === 'Edit') {

        const isUnique = checkIfRecipientRecordUnique(input, input.operationType, ambientProperties);

        if (!isUnique) {

            ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.UnableToAddDuplicatedRecipient', 'OK', 'OK', 2);
            return false;
        }
    }

    if (input.operationType === 'Delete' || input.operationType === 'Edit') {

        const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders ?? [];
        const relatedPaymentOrder = existingPaymentOrders.find(item => item.paymentOrderNumber === input.affectedRow.assignedPaymentOrderNumber ||
            item.paymentOrderNumber === input.affectedRow.assignedPitPaymentOrderNumber);

        if (relatedPaymentOrder && input.operationType === 'Delete') {

            ambientProperties.services.confirmationDialog.showConfirmation(`Невозможно удалить указанного выгодоприобретателя. Найден связанный РНВ: ${relatedPaymentOrder.paymentOrderNumber}`, 'OK', 'OK', 2);
            return false;
        }

        if (relatedPaymentOrder && input.operationType === 'Edit') {

            ambientProperties.services.confirmationDialog.showConfirmation(`Невозможно изменить указанного выгодоприобретателя. Найден связанный РНВ: ${relatedPaymentOrder.paymentOrderNumber}`, 'OK', 'OK', 2);
            return false;
        }
    }

    return true;
};

function checkIfRecipientRecordUnique(input, operationType) {


    const itemsToCheck = input.gridData.filter(item => !item.isPaid && item !== input.originalRow)
        .map(i => { return { code: i.partyCode, paymentType: i.recipientPaymentType.code }; });

    if ((operationType === 'Add' || operationType === 'Edit') && !input.affectedRow.isPaid) {

        itemsToCheck.push({ code: input.affectedRow.partyCode, paymentType: input.affectedRow.recipientPaymentType.code });
    }

    const unique = itemsToCheck.filter((obj, index) => itemsToCheck.findIndex((item) => item.code === obj.code && obj.paymentType === item.paymentType) === index);
    const duplicated = itemsToCheck.filter(i => !unique.includes(i));
    return duplicated?.length === 0;
}
