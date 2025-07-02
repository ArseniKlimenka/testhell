'use strict';

const { raiseActItemsChangedEvent } = require('@config-rgsl/acc-commission/lib/actUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} RenewSucceeded
 */

module.exports = async function renewItem(input, ambientProperties) {
    const ONLY_OK_BUTTON = 1;

    if (!input.context.selection) {
        return;
    }

    const documentNumbers = input.context.selection.map(_ => _.resultData.referenceNo);

    if (documentNumbers.length === 0) {
        return;
    }

    const request = {
        method: 'post',
        url: 'api/rgsl/accounting/shared/commission/act/renew-item',
        data: {
            actId: input.rootContext.Body.actId,
            actNo: input.rootContext.Number,
            lastUpdated: input.rootContext.Body.lastUpdated,
            documentNumbers: documentNumbers,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.RenewSucceeded', 'OK', 'Cancel', ONLY_OK_BUTTON);
    await raiseActItemsChangedEvent(ambientProperties);
};
