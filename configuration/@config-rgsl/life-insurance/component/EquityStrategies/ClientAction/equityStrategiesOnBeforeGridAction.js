'use strict';

module.exports = async function equityStrategiesOnBeforeGridAction(input, ambientProperties) {

    const { operationType, affectedRow } = input;

    if (['Add', 'Edit'].includes(operationType)) {

        const strategyName = affectedRow?.strategy.strategyName;
        const share = affectedRow?.share;
        const sum = affectedRow?.sum;

        if (!strategyName) {
            const notificationMessage = 'Заполните наименование стратегии!';
            await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
            return false;
        }

        if (!share || !sum) {
            const notificationMessage = 'Заполните долю суммы или сумму размещения в стратегии!';
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
