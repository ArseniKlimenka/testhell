'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} PeriodSuccessfullyReopened
 */

module.exports = async function reopenPeriod(input, ambientProperties) {
    const ONLY_OK_BUTTON = 1;
    const selection = input.context.selection;

    const request = {
        method: 'post',
        url: 'api/rgsl/accounting/shared/periods/reopen',
        data: {
            PeriodIds: selection.map(_ => _.resultData.periodId),
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.PeriodSuccessfullyReopened', 'OK', 'Cancel', ONLY_OK_BUTTON);
    this.view.reloadEntity();
};
