'use strict';

const ObjectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = async function exportFilteredRateOfReturnRulesEquityActives(input, ambientProperties) {

    const data = ObjectUtils.deepCopy(input.context.request.data);

    const exportRequest = {
        data
    };

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/ExportRateOfReturnRulesEquityActives/1',
        urlParams: {
            formatterName: 'ExportExcelRateOfReturnRulesEquityActives'
        },
        data: exportRequest,
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
            downloadLink.download = decodeURIComponent(`rateOfReturnRulesEquityActives`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            this.view.stopBlockingUI();
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });

};
