'use strict';

const partyOGRNLib = require('@config-rgsl/party/lib/partyOGRNLib');

module.exports = async function soleProprietorHistoryOnBeforeGridAction(input, ambientProperties) {

    const { operationType, affectedRow } = input;

    if (['Add', 'Edit'].includes(operationType)) {

        const configurationCodeName = this.view.getContext().ConfigurationCodeName;
        const validationErrors = partyOGRNLib.partyOGRNValidation(affectedRow.partyOGRN, this, configurationCodeName);

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
