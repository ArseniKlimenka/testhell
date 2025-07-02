'use strict';
const lib = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = async function exportPreEquityReport(input, ambientProperties) {

    const errors = [];

    const preEquityReportDate = input?.context?.Body?.preEquityReportDate;
    const changeTypes = [lib.changeTypes.investmentParametersEdit];
    if (!preEquityReportDate) {
        errors.push("дата");
    }

    if (errors.length != 0) {
        await ambientProperties.services.confirmationDialog.showError(`Не заполнены следующие параметры: ${errors.join(", ")}.`, 'UI_BOOTSTRAP.##OK', undefined, 1);

        return;
    }

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/ExportPreEquityReport/1',
        urlParams: {
            formatterName: 'ExportExcelPreEquityReport'
        },
        data: {
            data: {
                criteria: {
                    preEquityReportDate,
                    changeTypes
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
            downloadLink.download = decodeURIComponent(`Выгрузка отчета`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });
};
