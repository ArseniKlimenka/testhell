'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} ItemsWasDeleted
 */

module.exports = async function deleteItem(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;

    const hkeys = input.context.selection.flatMap(_ => _.resultData.rsdItemHkeys);

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/RsdDeleteItem/1',
        data: {
            data: {
                hkeys,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.ItemsWasDeleted', 'OK', 'Cancel', ONLY_OK_BUTTON);
    this.view.search();
};
