'use strict';

const partyTaxResidencyLib = require('@config-rgsl/party/component/PartyTaxResidency/lib/partyTaxResidencyLib');

module.exports = async function taxResidenciesOnBeforeGridAction(input, ambientProperties) {

    const { operationType, affectedRow } = input;

    if (['Add', 'Edit'].includes(operationType)) {

        const validationErrors = partyTaxResidencyLib.partyTaxResidencyValidation(affectedRow, this);

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
