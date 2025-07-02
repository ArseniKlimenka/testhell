'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function exportPreEquityDebitingRegistry(input, ambientProperties) {

    const errors = [];

    const preEquityDebitingRegistryDate = input?.context?.Body?.preEquityDebitingRegistryDate;
    if (!preEquityDebitingRegistryDate) {
        errors.push("дата");
    }

    if (errors.length != 0) {
        await ambientProperties.services.confirmationDialog.showError(`Не заполнены следующие параметры: ${errors.join(", ")}.`, 'UI_BOOTSTRAP.##OK', undefined, 1);

        return;
    }

    const request = {
        method: 'post',
        url: 'api/core/public/data-exports/exportPreEquityDebitingRegistry/1',
        urlParams: {
            formatterName: 'ExportExcelPreEquityDebitingRegistry'
        },
        data: {
            data: {
                criteria: {
                    preEquityDebitingRegistryDate
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
            const dateNow = dateUtils.dateNow();

            downloadLink.style = 'display: none';
            downloadLink.href = fileUrl;
            downloadLink.download = decodeURIComponent(`Реестр на списание денежных средств по договорам ПредДСЖ за ${dateNow}`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, 'UI_BOOTSTRAP.##OK', 'UI_BOOTSTRAP.##CANCEL', 3, 'small', { textKeySkipTranslate: true });
        });
};
