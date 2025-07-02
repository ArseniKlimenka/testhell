'use strict';

const { newGuid } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');
const { downloadFileById } = require('@config-rgsl/acc-base/lib/excelExportUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} DocumentTitle
 * @translationKey {translationKey} ExportNotEnoughRights
 */

module.exports = async function exportReport(input, ambientProperties) {
    let fileId;
    const criteria = input.rootContext.request.data.criteria;

    const ONLY_OK_BUTTON = 1;
    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const isSMGO = userRoles.some(x => x.ApplicationRoleCodeName == 'SMGO');
    if (!isSMGO) {

        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.ExportNotEnoughRights', "OK", "Cancel", ONLY_OK_BUTTON);
        return;
    }


    const request = {
        method: 'post',
        url: `api/core/shared/integration-services/BankStatementItemExportExcel/1`,
        data: {
            data: {
                searchCriteria: criteria,
                exportReportGuid: newGuid(),
            }
        },
        returnFullResponse: true
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);

        if (result.status === 200) {
            fileId = result.body.data.fileId; // eslint-disable-line @adinsure-tools/adinsure/no-body-property
        }

        const documentTitle = await ambientProperties.services.translate.get(ambientProperties.configurationCodeName.toUpperCase() + '.DocumentTitle');
        await downloadFileById(fileId, documentTitle, ambientProperties);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }
};
