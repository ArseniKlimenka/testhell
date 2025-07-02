'use strict';

const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} XmlFileCreated
 * @translationKey {translationKey} XmlFileCreatedWithErrors
 * @translationKey {translationKey} XmlFileConfirmCreate
 * @translationKey {translationKey} XmlFileNoEntries
 */

module.exports = async function exportFilteredCertificates(input, ambientProperties) {

    const view = this.view;
    view.search();

    const ONLY_OK_BUTTON = 1;
    const translate = ambientProperties.services.translate.getSync;
    const allCertificatesData = await getAllCertificatesData(input, ambientProperties, this.view);
    const itemNumbers = allCertificatesData?.data?.map(i => i.resultData.accountingCertificateNumber);

    if (!itemNumbers || itemNumbers.length === 0) {

        ambientProperties.services.confirmationDialog.showWarning(`${ambientProperties.configurationCodeName.toUpperCase()}.XmlFileNoEntries`, "OK", "Cancel", ONLY_OK_BUTTON);
        this.view.reloadEntity();
        return;
    }

    const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'XmlFileConfirmCreate');
    const confirmationResult = await ambientProperties.services.confirmationDialog.showNotification(`${msg} ${itemNumbers.length}?`, "OK", "Cancel", 0);

    if (!confirmationResult) {

        return;
    }

    const softwareVersion = await getSoftwareVersion(input, ambientProperties, view);
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

    if (showCorrectMessage) {

        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.XmlFileCreated', "OK", "Cancel", ONLY_OK_BUTTON);
    }
    this.view.reloadEntity();

};

async function getAllCertificatesData(input, ambientProperties, view) {

    try {
        view.startBlockingUI();
        const itemsDataSourceRequest = {
            method: 'post',
            url: `api/entity-infrastructure/shared/datasource/GetAccountingCertificateDataSource`,
            data: {
                data: {
                    criteria: { ...input.context.request.data.criteria }
                }
            }
        };

        itemsDataSourceRequest.data.data.criteria.accountingCertificateState = "Issued";
        return await ambientProperties.services.api.call(itemsDataSourceRequest);

    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        view.stopBlockingUI();
    }
}

async function getSoftwareVersion(input, ambientProperties, view) {

    try {
        view.startBlockingUI();

        const getSoftwareVersionDataSourceRequest = {
            method: 'post',
            url: `api/shell/internal/dashboards/dashboards/get-server-version`,
            data: {}
        };

        return await ambientProperties.services.api.call(getSoftwareVersionDataSourceRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        view.stopBlockingUI();
    }
}

async function getAccountingCertificateBodies(itemNumbers, ambientProperties, view) {

    const results = {};
    results.data = [];

    const chunkSize = 1000;
    for (let i = 0; i < itemNumbers.length; i += chunkSize) {

        const chunk = itemNumbers.slice(i, i + chunkSize);

        try {

            const dataSourceRequest = {
                method: 'post',
                url: `api/entity-infrastructure/shared/datasource/GetAccountingCertificateBodyDataSource`,
                data: {
                    data: {
                        criteria: {
                            accountingCertificateNumbers: chunk
                        }
                    }
                }
            };

            const dataSourceResult = await ambientProperties.services.api.call(dataSourceRequest);

            results.data = results.data.concat(dataSourceResult?.data);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            view.stopBlockingUI();
        }
    }

    return results;
}
