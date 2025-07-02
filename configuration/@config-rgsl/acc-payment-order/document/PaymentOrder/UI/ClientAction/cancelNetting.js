'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} NettingCancelled
 */

module.exports = async function cancelNetting(input, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/CancellPoNetting/1',
        data: {
            data: {
                currentPONumber: input.context.Number
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

    ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.NettingCancelled', 'OK', 'OK', 2);
    this.view.reloadEntity();
};
