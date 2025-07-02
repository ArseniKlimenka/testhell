'use strict';

module.exports = function exportRegisterForRussianPostReport(input, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/ExportRegisterForRussianPostReport/1',
        urlParams: {
            formatterName: 'RegisterForRussianPostReportExcel'
        },
        data: {
            data: {
                criteria: {
                    russianPostRegisterInclusionDateFrom: input.context.request.data.criteria.russianPostRegisterInclusionDateFrom,
                    russianPostRegisterInclusionDateTo: input.context.request.data.criteria.russianPostRegisterInclusionDateTo
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
            downloadLink.download = decodeURIComponent(`Реестр для почты РФ`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });
};
