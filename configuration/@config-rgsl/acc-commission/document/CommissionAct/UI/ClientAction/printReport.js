const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getAgentName } = require('@config-rgsl/acc-base/lib/excelExportUtils');

module.exports = async function printReport(input, ambientProperties) {
    const body = input.context.Body;
    const actNo = input.context.Number;
    const agentName = await getAgentName(body.aaServiceProviderCode, ambientProperties);
    const title = agentName + '_' + actNo + '_' + dateTimeUtils.formatDate(body.reportingPeriodTo, 'MM.yyyy') + '.xlsx';

    const data = {
        criteria: {
            actNo: actNo,
            groupByContract: body.groupByContract,
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
            downloadLink.download = decodeURIComponent(title);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });
};
