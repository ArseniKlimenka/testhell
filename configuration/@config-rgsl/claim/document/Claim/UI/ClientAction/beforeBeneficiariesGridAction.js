'use strict';

/**
 * @translationKey {translationKey} UnableToAddDuplicatedBeneficiary
 */
module.exports = function beforeBeneficiariesGridAction(input, ambientProperties) {

    if (input.operationType === 'Add' || input.operationType === 'Edit') {

        const isUnique = checkIfBeneficiaryRecordUnique(input, input.operationType, ambientProperties);

        if (!isUnique) {

            ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.UnableToAddDuplicatedBeneficiary', 'OK', 'OK', 2);
            return false;
        }
    }

    if (input.operationType === 'Delete' || input.operationType === 'Edit') {

        const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;
        const relatedPaymentOrder = existingPaymentOrders.find(item => item.paymentOrderNumber === input.affectedRow.assignedPaymentOrderNumber);

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

function checkIfBeneficiaryRecordUnique(input, operationType, ambientProperties) {

    const partyCodes = input.gridData
        .filter(item => !item.isPaid)
        .map((item) =>
            ({
                partyCode: item.partyCode,
                reasonCode: item.beneficiaryReason.code
            }));


    if (operationType === 'Add') {
        partyCodes.push(
            {
                partyCode: input.affectedRow.partyCode,
                reasonCode: input.affectedRow.beneficiaryReason.code
            });
    }

    let hasDuplicates = false;

    for (let i = 0; i < partyCodes.length; i++) {

        if (partyCodes.some((item, idx) =>
            partyCodes[i].partyCode == item.partyCode
            && partyCodes[i].reasonCode == item.reasonCode
            && i != idx)) {

            hasDuplicates = true;
            break;
        }
    }

    return !hasDuplicates;
}
