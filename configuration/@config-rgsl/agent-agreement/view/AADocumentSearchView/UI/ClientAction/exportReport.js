module.exports = async function exportReport(input, ambientProperties) {

    const data = input.context.request.data;

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/AgentAgreementExcelExport/1',
        urlParams: {
            formatterName: 'ExportExcelAgentAgreement'
        },
        data: {
            data
        },
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
            downloadLink.download = decodeURIComponent(`Выгрузка отчета`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            this.view.stopBlockingUI();
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });
};
