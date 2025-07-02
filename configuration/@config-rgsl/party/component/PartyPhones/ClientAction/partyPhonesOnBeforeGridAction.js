'use strict';

const partyPhoneLib = require('@config-rgsl/party/component/PartyPhone/lib/partyPhoneLib');

module.exports = async function partyPhonesOnBeforeGridAction(input, ambientProperties) {

    const { operationType, affectedRow, context } = input;
    const partyPhones = input.componentContext;

    if (['Add', 'Edit'].includes(operationType)) {

        const validationErrors = partyPhoneLib.phoneValidation(affectedRow, this);

        if (validationErrors && validationErrors.length > 0) {
            const notificationMessage = 'Заполните корректно все небходимые данные!';
            await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
            return false;
        }

        // Allow only one preferable
        if (affectedRow.isPreferable) {
            partyPhones?.forEach(item => {
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
