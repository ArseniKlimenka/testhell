'use strict';

module.exports = function exportReport(input, ambientProperties) {

    const dataForExport = input.rootContext.request.data;

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/ExportAccountingCertificateReport/1',
        urlParams: {
            formatterName: 'ExportAccountingCertificateExcel'
        },
        data: {
            data: dataForExport
        },
        returnHttpPromise: true,
        responseType: 'blob'
    };

    ambientProperties.services.api.call(request)
        .then(async (result) => {
            const fileUrl = window.URL.createObjectURL(result);
            const downloadLink = document.createElement('a');

            downloadLink.style = 'display: none';
            downloadLink.href = fileUrl;
            downloadLink.download = decodeURIComponent(`Выгрузка журнала справок`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });
};
