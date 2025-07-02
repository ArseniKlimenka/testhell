'use strict';

module.exports = function AssetReportDatePeriod(input, ambientProperties) {

    if (!input?.context?.request?.data?.criteria?.beginDate || !input?.context?.request?.data?.criteria?.endDate) {
        throw new Error('Пожалуйста, заполните период отчета корректно');
    }

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/ExportAssetPeriodReport/1',
        urlParams: {
            formatterName: 'ExportAssetPeriodExcel'
        },
        data: {
            data: {
                criteria: {
                    beginDate: input.context.request.data.criteria.beginDate,
                    endDate: input.context.request.data.criteria.endDate
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
