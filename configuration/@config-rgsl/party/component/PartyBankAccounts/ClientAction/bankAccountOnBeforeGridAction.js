'use strict';

const partyBankAccountLib = require('@config-rgsl/party/component/PartyBankAccount/lib/partyBankAccountLib');

module.exports = async function bankAccountOnBeforeGridAction(input, ambientProperties) {

    const { operationType, affectedRow } = input;

    if (['Add', 'Edit'].includes(operationType)) {

        const validationErrors = partyBankAccountLib.bankAccountValidation(affectedRow, this);

        if (validationErrors && validationErrors.length > 0) {
            const notificationMessage = 'Заполните корректно все небходимые данные!';
            await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
            return false;
        }

        return true;

    }

    if (['Delete'].includes(operationType)) {
        const notificationMessage = 'Вы уверены, что хотите выполнить удаление?';
        const answer = await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'Да', 'Нет', 3);
        return answer;
    }

};
