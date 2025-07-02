'use-strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} executeActiveContractsForOperationStarted
 *
 */
module.exports = async function executeActiveContractsForOperationEtlService(input, ambientProperties) {
    const request = {
        method: 'post',
        url: 'api/core/shared/etl-services/ActiveContractsForOperationEtlService/1',
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
        `${ambientProperties.configurationCodeName.toUpperCase()}.executeActiveContractsForOperationStarted`,
        'UI_BOOTSTRAP.##OK',
        undefined,
        1);
};
