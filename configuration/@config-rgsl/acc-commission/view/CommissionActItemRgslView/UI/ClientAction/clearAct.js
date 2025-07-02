'use strict';

const { raiseActItemsChangedEvent } = require('@config-rgsl/acc-commission/lib/actUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} ClearedSuccessfully
 */

module.exports = async function clearAct(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;

    const request = {
        method: 'post',
        url: 'api/rgsl/accounting/shared/commission/act/clear',
        data: {
            actId: input.rootContext.Body.actId,
            actNo: input.rootContext.Number,
            lastUpdated: input.rootContext.Body.lastUpdated,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.ClearedSuccessfully', 'OK', 'Cancel', ONLY_OK_BUTTON);
    await raiseActItemsChangedEvent(ambientProperties);
};
