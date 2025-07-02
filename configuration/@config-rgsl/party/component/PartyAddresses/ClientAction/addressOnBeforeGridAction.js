'use strict';

const partyAddressLib = require('@config-rgsl/party/component/PartyAddress/lib/partyAddressLib');

module.exports = async function addressOnBeforeGridAction(input, ambientProperties) {

    const { operationType, affectedRow } = input;

    if (['Add', 'Edit'].includes(operationType)) {

        if (affectedRow.isSameAsRegistration) { return true; }

        const validationErrors = partyAddressLib.addressValidation(affectedRow, this).filter(e => e.severity !== 'Note');

        if (validationErrors && validationErrors.length > 0) {
            const notificationMessage = 'Заполните корректно все небходимые данные!';
            await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
            return false;
        }

        if (!affectedRow.isManualAddress && !affectedRow.isForeignAddress) {
            if (!affectedRow.house) {
                const notificationMessage = 'Дом не указан. Вы уверены, что хотите внести адрес без указания дома?';
                const answer = await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'Да', 'Нет', 3);
                return answer;
            }

            if (affectedRow.house && !affectedRow.flat) {
                const notificationMessage = 'Квартира не указана. Вы уверены, что хотите внести адрес без указания квартиры?';
                const answer = await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'Да', 'Нет', 3);
                return answer;
            }
        }

        return true;
    }

    if (['Delete'].includes(operationType)) {
        const notificationMessage = 'Вы уверены, что хотите выполнить удаление?';
        const answer = await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'Да', 'Нет', 3);
        return answer;
    }
};
