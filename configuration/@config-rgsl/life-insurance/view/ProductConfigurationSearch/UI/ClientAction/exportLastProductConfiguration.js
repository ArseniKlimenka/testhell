'use strict';

module.exports = async function exportLastProductConfiguration(input, ambientProperties) {

    const exportRequest = {
        data: {
            criteria: {
                maxVersion: true
            }
        }
    };

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/ExportProductConfiguration/1',
        urlParams: {
            formatterName: 'ExportExcelProductConfiguration'
        },
        data: exportRequest,
        returnHttpPromise: true,
        responseType: 'blob'
    };

    this.view.startBlockingUI();

    ambientProperties.services.api.call(request)
        .then(async (result) => {
            this.view.stopBlockingUI();
            const fileUrl = window.URL.createObjectURL(result);
            const downloadLink = document.createElement('a');

            downloadLink.style = 'display: none';
            downloadLink.href = fileUrl;
            downloadLink.download = decodeURIComponent(`productConfiguration`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            this.view.stopBlockingUI();
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });

};
