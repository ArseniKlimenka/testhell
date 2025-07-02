const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

/**
 * @translationKey {translationKey} DateRangeLimitation
 */

module.exports = async function exportEconomicParametersReport(input, ambientProperties) {

    const errors = [];
    const issueDateFrom = input.context.Body.issueDateFrom;
    if (!issueDateFrom) {
        errors.push("дата заключения от");
    }

    const issueDateTo = input.context.Body.issueDateTo;
    if (!issueDateTo) {
        errors.push("дата заключения до");
    }

    const productGroups = input.context.Body.productGroups;
    if (!productGroups.length) {
        errors.push("группа продуктов");
    }

    if (errors.length != 0) {
        await ambientProperties.services.confirmationDialog.showError(`Не заполнены следующие параметры: ${errors.join(", ")}.`, 'UI_BOOTSTRAP.##OK', undefined, 1);
        return;
    }

    const issueDateRangeInDays = dateTimeUtils.getDayDifference(issueDateFrom, issueDateTo) + 1;
    if (issueDateRangeInDays > 90) {
        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.DateRangeLimitation', "OK", "Cancel", 1);
        return;
    }

    const request = {
        method: "post",
        url: "api/core/public/data-exports/ExportEconomicParametersReport/1",
        urlParams: {
            formatterName: "ExportEconomicParametersReportExcel"
        },
        data: {
            data: {
                criteria: {
                    issueDateFrom,
                    issueDateTo,
                    productGroups,
                    contractType: 'Policy'
                }
            }
        },
        returnHttpPromise: true,
        responseType: "blob"
    };

    this.view.startBlockingUI();

    ambientProperties.services.api.call(request)
        .then(async (result) => {
            this.view.stopBlockingUI();
            const fileUrl = window.URL.createObjectURL(result);
            const downloadLink = document.createElement("a");

            downloadLink.style = "display: none";
            downloadLink.href = fileUrl;
            downloadLink.download = decodeURIComponent(`Экономика договоры`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            this.view.stopBlockingUI();
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, "UI_BOOTSTRAP.##OK", "UI_BOOTSTRAP.##CANCEL", 3, "small", { textKeySkipTranslate: true });
        });
};
