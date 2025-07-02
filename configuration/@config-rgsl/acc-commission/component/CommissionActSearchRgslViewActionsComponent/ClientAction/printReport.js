module.exports = async function printReport(input, ambientProperties) {
    await input.context.selection.forEach(element => {
        const act = {
            actId: element.resultData.actId,
            actNo: element.resultData.actNo,
        };

        printSingleReport(act, ambientProperties);
    });
};

async function printSingleReport(act, ambientProperties) {
    const data = {
        criteria: {
            actId: act.actId,
        }
    };

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/CommissionActRgslExportExcel/1',
        urlParams: {
            formatterName: 'CommissionActRgslExportExcelFormat'
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
            downloadLink.download = decodeURIComponent(act.actNo);
            document.body.appendChild(downloadLink); // eslint-disable-line @adinsure-tools/adinsure/no-body-property
            downloadLink.click();
            return;
        }).catch(error => {
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });
}
