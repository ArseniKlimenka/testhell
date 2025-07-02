const ObjectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { getAllProducts } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = async function exportReportCredit(input, ambientProperties) {
    const data = ObjectUtils.deepCopy(input.context.request.data);

    // get available products
    const allProducts = await getAllProducts(ambientProperties);
    const availableProducts = allProducts.filter(item => item.productGroup == 'credit' && item.productCode != 'CACB');
    const availableProductsCodes = availableProducts.map(item => item.productCode);
    if (data.criteria.productsArray && data.criteria.productsArray.length > 0) {
        data.criteria.productsArray = data.criteria.productsArray.filter(item => availableProductsCodes.includes(item));
    }
    else {
        data.criteria.productsArray = availableProductsCodes;
    }
    if (data.criteria.productCode && availableProductsCodes.includes(data.criteria.productCode)) {
        data.criteria.productCode = 'NOPRODUCT'; // fake value to not export
    }

    // export
    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/ReportContractExportExcel/1',
        urlParams: {
            formatterName: 'ExportExcelReportContract'
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
