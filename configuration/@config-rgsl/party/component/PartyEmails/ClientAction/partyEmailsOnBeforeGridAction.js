'use strict';

const partyEmailLib = require('@config-rgsl/party/component/PartyEmail/lib/partyEmailLib');

module.exports = async function partyEmailsOnBeforeGridAction(input, ambientProperties) {

    const { operationType, affectedRow, componentContext } = input;

    if (['Add', 'Edit'].includes(operationType)) {

        const validationErrors = partyEmailLib.emailValidation(affectedRow, this);

        if (validationErrors && validationErrors.length > 0) {
            const notificationMessage = 'Заполните корректно все небходимые данные!';
            await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
            return false;
        }

        // Allow only one preferable
        if (affectedRow.isPreferable) {
            componentContext.forEach(function (item) {
                item.isPreferable = false;
            });
            affectedRow.isPreferable = true;
        }

        return true;

    }

    if (['Delete'].includes(operationType)) {
        const notificationMessage = 'Вы уверены, что хотите выполнить удаление?';
        const answer = await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'Да', 'Нет', 3);
        return answer;
    }
};
