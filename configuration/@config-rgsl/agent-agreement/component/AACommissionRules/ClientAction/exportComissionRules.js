'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function exportComissionRules(input, ambientProperties) {

    const originDocumentNumber = input.context.OriginalDocumentNumber ?? input.rootContext.OriginalDocumentNumber;

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/ComissionRulesExcelExport/1',
        urlParams: {
            formatterName: 'ExportExcelComissionRules'
        },
        data: {
            criteria:{
                originDocumentNum: originDocumentNumber
            }
        },
        returnHttpPromise: true,
        responseType: 'blob'
    };

    this.view.startBlockingUI();

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    const fileUrl = window.URL.createObjectURL(result);
    const downloadLink = document.createElement('a');

    downloadLink.style = 'display: none';
    downloadLink.href = fileUrl;
    downloadLink.download = decodeURIComponent('Выгрузка условий');
    document.body.appendChild(downloadLink);
    downloadLink.click();
};
