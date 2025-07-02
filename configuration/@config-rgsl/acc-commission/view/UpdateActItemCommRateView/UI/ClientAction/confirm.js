const { raiseActItemsChangedEvent } = require('@config-rgsl/acc-commission/lib/actUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} UpdatedSuccessfully
 */

module.exports = async function confirm(input, ambientProperties) {
    const ONLY_OK_BUTTON = 1;
    const body = input.context.Body;

    const request = {
        method: 'POST',
        url: 'api/rgsl/accounting/shared/commission/act/change-item-comm-rate',
        data: {
            actItemIds: body.actItemIds,
            lastUpdated: body.lastUpdated,
            commRateManual: body.commRateManual,
            lcCommAmountManual: body.lcCommAmountManual,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.UpdatedSuccessfully', 'OK', 'Cancel', ONLY_OK_BUTTON);
    const { dialogContext } = input.context;

    raiseActItemsChangedEvent(ambientProperties);

    dialogContext.closeDialog();
};
