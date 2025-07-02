module.exports = async function exportReport(input, ambientProperties) {
    const data = input.context.request.data;
    const title = 'Экспорт_ВВ.xlsx';

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/VerificationActivitiesExport/1',
        urlParams: {
            formatterName: data.criteria.showVerification ? 'VerificationActivitiesExportFullFormat' : 'VerificationActivitiesExportShortFormat'
        },
        data: {
            data,
        },
        returnHttpPromise: true,
        responseType: 'blob'
    };

    await ambientProperties.services.api.call(request)
        .then(async (result) => {
            const fileUrl = window.URL.createObjectURL(result);
            const downloadLink = document.createElement('a');

            downloadLink.style = 'display: none';
            downloadLink.href = fileUrl;
            downloadLink.download = decodeURIComponent(title);
            document.body.appendChild(downloadLink); // eslint-disable-line @adinsure-tools/adinsure/no-body-property
            downloadLink.click();
            return;
        }).catch(error => {
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });
};
