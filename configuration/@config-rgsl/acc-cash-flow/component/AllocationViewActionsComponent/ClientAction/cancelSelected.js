'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} AllocationSuccessfullyCancelled
 */

module.exports = async function cancelSelected(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;

    const allocationIds = input.context.selection.map(i => i.resultData.allocationId);

    const request = {
        method: 'post',
        url: `api/rgsl/accounting/shared/cash-flow/allocation/cancel-allocation`,
        data: {
            allocationIds: allocationIds,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.AllocationSuccessfullyCancelled', "OK", "Cancel", ONLY_OK_BUTTON);
    this.view.reloadEntity();
};
