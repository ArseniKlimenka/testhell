'use strict';

const { modificationTypes } = require('@config-rgsl/life-insurance/lib/contractModificationHelper');

module.exports = async function executeCuratorUpdate(input, ambientProperties) {

    const contractNumber = input.context.Body.contractNumber;
    const curator = input.context.Body.curator;
    const modificationType = modificationTypes.curator;

    if (!contractNumber || !curator) {

        ambientProperties.services.confirmationDialog.showConfirmation('Укажите все необходимые параметры!', 'OK', 'OK', 2);
        return;
    }

    this.view.startBlockingUI();

    const request = {
        method: 'post',
        url: `api/core/shared/integration-services/GeneralUpdateContract/1`,
        data: {
            data: {
                contractNumber,
                curator,
                modificationType
            }
        }
    };

    await ambientProperties.services.api.call(request)
        .then(undefined)
        .catch(error => {
            this.view.stopBlockingUI();
            throw error.error?.data?.errorResponse?.message ?? error.message;
        });

    ambientProperties.services.confirmationDialog.showConfirmation('Куратор успешно обновлен', 'OK', 'OK', 2);
    this.view.stopBlockingUI();
};

