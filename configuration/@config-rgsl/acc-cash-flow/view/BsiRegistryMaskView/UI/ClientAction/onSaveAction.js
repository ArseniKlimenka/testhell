'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} Saved
 */

module.exports = async function onSaveAction(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;

    const body = input.context.Body;

    const request = {
        method: 'put',
        url: 'api/rgsl/accounting/shared/cash-flow/bank-statement/set-registry-mask-settings',
        data: {
            rules: body.rules,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.Saved', 'OK', 'Cancel', ONLY_OK_BUTTON);
};
