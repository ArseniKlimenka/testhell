'use strict';

module.exports = function exportCoolingPeriodReport(input, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/ExportCoolingPeriodReport/1',
        urlParams: {
            formatterName: 'ExportCoolingPeriodExcel'
        },
        data: {
            data: {
                criteria: {
                    requestIssuedDateFrom: input.context.request.data.criteria.requestIssuedDateFrom,
                    requestIssuedDateTo: input.context.request.data.criteria.requestIssuedDateTo
                }
            }
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
            downloadLink.download = decodeURIComponent(`Реестр для периода охлаждения`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });
};
