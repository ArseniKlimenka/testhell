'use strict';

const { commissionActStatusId } = require('@config-rgsl/acc-base/lib/actConsts');
const { raiseActItemsChangedEvent } = require('@config-rgsl/acc-commission/lib/actUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} AutoPopulatedSuccessfully
 */

module.exports = async function autoPopulate(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;
    const body = input.rootContext.Body;
    if (body.statusId) {
        body.statusId = commissionActStatusId.GENERATING;
    }
    this.view.rebind();

    const request = {
        method: 'post',
        url: `api/core/shared/integration-services/ActAutoPopulate/1`,
        data: {
            data: {
                actNumber: input.rootContext.Number,
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

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.AutoPopulatedSuccessfully', 'OK', 'Cancel', ONLY_OK_BUTTON);
    await raiseActItemsChangedEvent(ambientProperties);
};
