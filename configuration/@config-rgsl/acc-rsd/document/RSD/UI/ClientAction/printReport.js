module.exports = async function printReport(input, ambientProperties) {
    const body = input.context.Body;
    const rsdNumber = input.context.Number;
    const title = 'РСД ' + rsdNumber + ' от ' + body.createdDate + '.xlsx';

    const data = {
        criteria: {
            rsdNumber: rsdNumber,
            groupByContract: true,
        }
    };

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/RsdItemsExportExcel/1',
        urlParams: {
            formatterName: 'RsdItemsExportExcelFormat'
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
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });
};
