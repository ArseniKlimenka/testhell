const ObjectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function exportTotalAmounts(input, ambientProperties) {

    const data = ObjectUtils.deepCopy(input.context.request.data);

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/TotalAmountExcelExport/1',
        urlParams: {
            formatterName: 'ExportExcelTotalAmounts'
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
        }).catch(err => {
            this.view.stopBlockingUI();
            throwResponseError(err);
        });
};
