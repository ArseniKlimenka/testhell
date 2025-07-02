'use-strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} executeAutoAllocatePaymentsStarted
 *
 */
module.exports = async function executeAutoAllocatePaymentsEtlService(input, ambientProperties) {
    const request = {
        method: 'post',
        url: 'api/core/shared/etl-services/AutoAllocatePaymentsEtlService/1',
        data: {
            data: {

            }
        },
        returnHttpPromise: true
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

    ambientProperties.services.confirmationDialog.showNotification(
        `${ambientProperties.configurationCodeName.toUpperCase()}.executeAutoAllocatePaymentsStarted`,
        'UI_BOOTSTRAP.##OK',
        undefined,
        1);
};
