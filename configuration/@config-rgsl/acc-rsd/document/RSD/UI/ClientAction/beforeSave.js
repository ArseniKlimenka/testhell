const { rsdStatusIds } = require('@config-rgsl/acc-rsd/lib/rsdConsts');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} DraftRsdExists
 */

module.exports = async function beforeSave(input, ambientProperties) {

    if (input.context.Number) {
        return;
    }

    const actRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetRsdDocumentDataSource',
        data: {
            data: {
                criteria: {
                    stateCodes: [
                        rsdStatusIds.DRAFT,
                        rsdStatusIds.COMPLETING,
                    ],
                }
            }
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(actRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    const docs = result.data.map(_ => _.resultData);
    if (docs.length !== 0) {
        const ONLY_OK_BUTTON = 1;
        ambientProperties.services.confirmationDialog.showError(ambientProperties.configurationCodeName.toUpperCase() + '.DraftRsdExists', 'OK', 'Cancel', ONLY_OK_BUTTON);
        return false;
    }
};
