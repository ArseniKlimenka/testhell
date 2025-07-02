
'use-strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} contractActivationStarted
 *
 */
module.exports = async function activateContractsWithPaidFirstInstallment(input, ambientProperties) {
    const request = {
        method: 'post',
        url: 'api/core/shared/etl-services/ActivateContractsWithPaidFirstInstallmentEtlService/1',
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
        `${ambientProperties.configurationCodeName.toUpperCase()}.contractActivationStarted`,
        'UI_BOOTSTRAP.##OK',
        undefined,
        1);
};
