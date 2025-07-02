'use strict';


const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} XmlFileCreated
 * @translationKey {translationKey} XmlFileCreatedWithErrors
 * @translationKey {translationKey} XmlFileCreatedNotAll
 * @translationKey {translationKey} XmlFileMayCreateOnlyIssued
 */

module.exports = async function createFnsXml(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;
    const translate = ambientProperties.services.translate.getSync;

    const itemNumbers = input.context.selection.filter((x)=> x.resultData.accountingCertificateState === "Issued")
        .map(i => i.resultData.accountingCertificateNumber);

    if (!itemNumbers || itemNumbers.length === 0) {

        const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'XmlFileMayCreateOnlyIssued');
        ambientProperties.services.confirmationDialog.showWarning(msg, "OK", "Cancel", ONLY_OK_BUTTON);
        this.view.reloadEntity();
        return;
    }

    const getSoftwareVersionDataSourceRequest = {
        method: 'post',
        url: `api/shell/internal/dashboards/dashboards/get-server-version`,
        data: {}
    };

    const softwareVersion = await ambientProperties.services.api.call(getSoftwareVersionDataSourceRequest);

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/AccountingCertificateCreateXML/1',
        data: {
            data: {
                itemNumbers: itemNumbers,
                softwareVersion: softwareVersion
            }
        }
    };

    let result;
    let showCorrectMessage = true;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);

        if (result.FnsErrorDocuments?.length > 0) {

            showCorrectMessage = false;

            const errorCodes = result.FnsErrorDocuments.map(err => {
                const obj = {};
                for (const prop in err) {
                    if (err[prop] !== null) {
                        obj[prop] = err[prop];
                    }
                }
                return obj;
            });

            let errorMessage = '';
            errorCodes.forEach((element) => { errorMessage += `№ справки ${element}\n`; });

            const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'XmlFileCreatedWithErrors', { errorMessage: errorMessage });
            ambientProperties.services.confirmationDialog.showWarning(msg, "OK", "Cancel", ONLY_OK_BUTTON);
        }

    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }


    if (itemNumbers.length != input.context.selection.length) {

        const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'XmlFileCreatedNotAll');
        ambientProperties.services.confirmationDialog.showWarning(msg, "OK", "Cancel", ONLY_OK_BUTTON);
    }
    else if (showCorrectMessage) {

        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.XmlFileCreated', "OK", "Cancel", ONLY_OK_BUTTON);
    }
    this.view.reloadEntity();
};
