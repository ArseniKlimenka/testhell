'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = async function onBeforeGridAction(input, ambientProperties) {

    const paymentGraceDateProlongation = getValue(input, 'affectedRow.paymentGraceDateProlongation');
    if (paymentGraceDateProlongation) {

        const paymentExpirationDate = getValue(input, 'affectedRow.paymentExpirationDate');
        if (paymentGraceDateProlongation <= paymentExpirationDate) {

            const notificationMessage = "Дата продления льготного периода должна быть больше даты крайнего срока оплаты!";
            await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);

            return false;
        }

        const endDate = getValue(input, 'rootContext.Body.policyTerms.endDate');
        if (paymentGraceDateProlongation > endDate) {

            const notificationMessage = "Дата продления льготного периода должна быть меньше или равна даты окончания договора!";
            await ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);

            return false;
        }
    }

    return true;
};
