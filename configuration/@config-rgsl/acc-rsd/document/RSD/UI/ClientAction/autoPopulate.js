'use strict';

/**
 * @translationKey {translationKey} AutoPopulatedSuccessfully
 */

module.exports = async function autoPopulate(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;
    const body = input.rootContext.Body;

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/RsdAutoPopulate/1',
        data: {
            data: {
                rsdNumber: input.rootContext.Number,
            }
        }
    };

    this.view.startBlockingUI();
    try {
        const result = await ambientProperties.services.api.call(request);
        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.AutoPopulatedSuccessfully', 'OK', 'Cancel', ONLY_OK_BUTTON);
    }
    catch (err) {
        ambientProperties.services.confirmationDialog.showError(JSON.stringify(err), 'OK', 'Cancel', ONLY_OK_BUTTON);
    }
    finally {
        this.view.stopBlockingUI();
    }

    this.view.reloadEntity();
};
