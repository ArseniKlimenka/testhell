'use strict';

const {sendVerificationEmail, sendSmsVerificationCode} = require('@config-rgsl/life-insurance/lib/ePolicyVerificationHelper');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function sendVerificationData(input, ambientProperties) {

    let codeResponse;

    const currentActor = ambientProperties.currentWorkUnitActor;

    // Don't remove, needed to send email ->
    ambientProperties.currentWorkUnitActor = 'System';
    // <- Don't remove, needed to send email

    try {
        this.view.startBlockingUI();
        codeResponse = await sendSmsVerificationCode(input, ambientProperties, this.view);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    if (codeResponse?.isSent) {

        await sendVerificationEmail(input, ambientProperties, false, this.view).catch(error => {
            throw error;
        });

        ambientProperties.services.confirmationDialog.showConfirmation('Код отправлен', 'OK', 'OK', 2);
    }
    else if (codeResponse?.isOnCooldown) {

        ambientProperties.services.confirmationDialog.showConfirmation(`Подождите еще ${codeResponse.cooldownTime} мин. перед повторной отправкой.`, 'OK', 'OK', 2);
    }
    else {

        ambientProperties.services.confirmationDialog.showConfirmation('Ошибка при отправке сообщения', 'OK', 'OK', 2);
    }

    ambientProperties.currentWorkUnitActor = currentActor;
};
