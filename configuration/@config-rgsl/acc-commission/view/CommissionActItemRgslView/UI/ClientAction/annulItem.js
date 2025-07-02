'use strict';

const { raiseActItemsChangedEvent } = require('@config-rgsl/acc-commission/lib/actUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} ItemWasAnnulled
 */

module.exports = async function annulItem(input, ambientProperties) {
    const ONLY_OK_BUTTON = 1;

    if (!input.context.selection) {
        return;
    }

    const items = input.context.selection.map(_ => ({
        contractNumber: _.resultData.referenceNo,
        dueDate: _.resultData.dueDate,
    }));

    if (items.length === 0) {
        return;
    }

    const request = {
        method: 'post',
        url: 'api/rgsl/accounting/shared/commission/act/annul-item',
        data: {
            actId: input.rootContext.Body.actId,
            actNo: input.rootContext.Number,
            lastUpdated: input.rootContext.Body.lastUpdated,
            items: items,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.ItemWasAnnulled', 'OK', 'Cancel', ONLY_OK_BUTTON);
    await raiseActItemsChangedEvent(ambientProperties);
};
