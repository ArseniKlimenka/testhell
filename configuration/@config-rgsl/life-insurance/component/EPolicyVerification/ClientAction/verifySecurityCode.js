'use strict';

const { verificationState } = require('@config-rgsl/life-insurance/lib/ePolicyVerificationConsts');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function verifySecurityCode(input, ambientProperties) {

    const securityCode = input.componentContext.enteredSecurityCode;

    if (!securityCode) {

        ambientProperties.services.confirmationDialog.showConfirmation('Введите код подтверждения', 'OK', 'OK', 2);
        return;
    }

    this.view.startBlockingUI();

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/VerifySmsSecurityCode/1',
        data: {
            data: {
                contractNumber: input.context.Number,
                securityCode: securityCode,
            }
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    const state = result.data.verificationState;

    if (!state && state !== 0) {

        ambientProperties.services.confirmationDialog.showConfirmation('Ошибка при подтверждении кода.', 'OK', 'OK', 2);
        return;
    }

    switch (state) {
        case verificationState.accepted: {

            let isSuccessfulTransition = true;
            let documentWasModified = false;

            await this.view.makeTransition('Draft_to_Active').catch(error => {

                isSuccessfulTransition = false;

                const documentModifiedEnCode = "SYS-0197";
                const documentModifiedRuCode = "SYS-0198";
                const errorCode = error?.error?.Code;
                documentWasModified = [documentModifiedEnCode, documentModifiedRuCode].includes(errorCode);
            });

            if (isSuccessfulTransition) {

                const res = await ambientProperties.services.confirmationDialog.showConfirmation('Код подтвержден. Проверьте, приложены ли все обязательные документы.', 'OK', 'OK', 2);
                this.view.reloadEntity();
            }
            else {

                if (documentWasModified) {

                    const res = await ambientProperties.services.confirmationDialog.show('Документ, над которым вы работаете, был изменен другим пользователем! Сделанные вами изменения не сохранились. Обновите документ и попробуйте снова. При нажатии на ОК документ будет обновлен.', 'OK', 'OK', 2);
                    this.view.reloadEntity();

                } else {
                    ambientProperties.services.confirmationDialog.show('Код подтвержден, но перевод договора в «Подписан» невозможен! Необходимо исправить ошибки и перевести договор в «Подписан» через «Действия».', 'OK', 'OK', 2);
                }
            }

            break;
        }
        case verificationState.expired:
            ambientProperties.services.confirmationDialog.showConfirmation('Срок действия кода истек', 'OK', 'OK', 2);
            break;
        case verificationState.incorrect:
        case verificationState.notFound:
            ambientProperties.services.confirmationDialog.showConfirmation('Введен неверный код', 'OK', 'OK', 2);
            break;
    }

};

