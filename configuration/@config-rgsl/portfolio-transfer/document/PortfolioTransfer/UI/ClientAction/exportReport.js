module.exports = async function exportReport(input, ambientProperties) {

    const body = input.context.Body;
    const documentNo = input.context.Number;
    const issueDate = body.issueDate;
    const title = documentNo + '_' + issueDate + '.xlsx';

    const data = {
        criteria: {
            documentNo: documentNo
        }
    };

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/PortfolioTransferItemsRgslExportExcel/1',
        urlParams: {
            formatterName: 'PortfolioTransferItemsRgslExportExcelFormat'
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
