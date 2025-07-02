'use strict';

const objectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @translationKey {translationKey} UnableToAddDuplicatedBeneficiary
 */
module.exports = function beforeBeneficiariesGridAction(input, ambientProperties) {

    if (input.operationType === 'Add' || input.operationType === 'Edit') {

        const isUnique = checkIfBeneficiaryRecordUnique(input, input.operationType, ambientProperties);

        if (!isUnique) {

            ambientProperties.services.confirmationDialog
                .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.UnableToAddDuplicatedBeneficiary', 'OK', 'OK', 2);
            return false;
        }
    }

    if (input.operationType === 'Delete' || input.operationType === 'Edit') {

        const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders || [];
        const relatedPaymentOrder = existingPaymentOrders.find(item => item.paymentOrderNumber === input.affectedRow.assignedPaymentOrderNumber ||
            item.paymentOrderNumber === input.affectedRow.assignedPitPaymentOrderNumber);

        const poEditMessage = 'Невозможно удалить указанного выгодоприобретателя. Найден связанный РНВ:';

        if (relatedPaymentOrder && input.operationType === 'Delete') {

            ambientProperties.services.confirmationDialog
                .showConfirmation(`${poEditMessage} ${relatedPaymentOrder.paymentOrderNumber}`, 'OK', 'OK', 2);
            return false;
        }

        if (relatedPaymentOrder && input.operationType === 'Edit') {

            ambientProperties.services.confirmationDialog
                .showConfirmation(`${poEditMessage} ${relatedPaymentOrder.paymentOrderNumber}`, 'OK', 'OK', 2);
            return false;
        }
    }

    return true;
};

function checkIfBeneficiaryRecordUnique(input, operationType) {

    const itemsToCheck = input.gridData.filter(item => !item.isPaid && item !== input.originalRow)
        .map(i => { return { code: i.partyCode, paymentType: i.beneficiaryPaymentType?.code }; });

    if ((operationType === 'Add' || operationType === 'Edit') && !input.affectedRow.isPaid) {

        itemsToCheck.push({ code: input.affectedRow.partyCode, paymentType: input.affectedRow.beneficiaryPaymentType?.code });
    }

    const unique = itemsToCheck.filter((obj, index) => itemsToCheck.findIndex((item) => item.code === obj.code && item.paymentType === obj.paymentType) === index);
    const duplicated = itemsToCheck.filter(i => !unique.includes(i));
    return duplicated?.length === 0;
}
