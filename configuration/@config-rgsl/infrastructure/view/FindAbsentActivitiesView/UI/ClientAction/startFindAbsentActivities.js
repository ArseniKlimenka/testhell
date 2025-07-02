'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} Success
 */

module.exports = async function startFindAbsentActivities(input, ambientProperties) {

    const result = await showDialog(ambientProperties);
    if (result?.success) {

        const request = {
            method: 'post',
            url: 'api/core/etl-services/FindAbsentActivitiesETL/1',
            data: {
                data: {
                    createdOnFrom: result.dateFrom,
                    createdOnTo: result.dateTo,
                }
            }
        };

        let etlResult;
        try {
            this.view.startBlockingUI();
            etlResult = await ambientProperties.services.api.call(request);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        const ONLY_OK_BUTTON = 1;
        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.Success', 'OK', 'Cancel', ONLY_OK_BUTTON);
        this.view.reloadEntity();
    }

};

/**
 * @uses ClientAction:onLoadFindAbsentActivitiesDialog
 */
async function showDialog(ambientProperties) {

    const viewDialogService = ambientProperties.services.viewDialog;

    const inputContext = {
    };

    const dialogViewReference = {
        configurationCodeName: 'FindAbsentActivitiesRunNewView',
        configurationConceptType: 'SearchView',
        configurationVersion: '1'
    };

    const dialogParams = {
        dialogViewReference,
        customData: inputContext,
        dialogSize: 'small',
        onLoad: 'onLoadFindAbsentActivitiesDialog'
    };

    const result = await viewDialogService.show(dialogParams);
    return result;

}
