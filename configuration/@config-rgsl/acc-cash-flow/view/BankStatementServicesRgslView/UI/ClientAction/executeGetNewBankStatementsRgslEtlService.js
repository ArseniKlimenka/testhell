'use-strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} executeGetNewBankStatementsStarted
 *
 */
module.exports = async function executeGetNewBankStatementsRgslEtlService(input, ambientProperties) {

    let rgslGuid = input.context.Body.rgslGuid;
    if (rgslGuid && rgslGuid.length === 0) {
        rgslGuid = undefined;
    }

    if (rgslGuid) {
        const regex = new RegExp(/^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/);
        if (!regex.test(rgslGuid)) {
            throw 'Invalid GUID!';
        }

        await markPaymentToReload(rgslGuid, ambientProperties);
    }

    const request = {
        method: 'post',
        url: 'api/core/shared/etl-services/GetNewBankStatementsRgslEtlService/1',
        data: {
            data: {
                rgslGuid,
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
        `${ambientProperties.configurationCodeName.toUpperCase()}.executeGetNewBankStatementsStarted`,
        'UI_BOOTSTRAP.##OK',
        undefined,
        1);
};

async function markPaymentToReload(rgslGuid, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/rgsl/accounting/shared/cash-flow/bank-statement/mark-payment-to-reload',
        data: {
            rgslGuid,
        },
        returnHttpPromise: true
    };

    await ambientProperties.services.api.call(request);
}
