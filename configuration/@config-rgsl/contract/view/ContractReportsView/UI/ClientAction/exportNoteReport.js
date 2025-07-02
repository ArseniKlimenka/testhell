const { getValue } = require("@config-rgsl/infrastructure/lib/ObjectUtils");

module.exports = async function exportNoteReport(input, ambientProperties) {

    const errors = [];
    const productCode = getValue(input, "context.Body.productCode");
    if (!productCode) {
        errors.push("продукт");
    }

    const strategyCode = getValue(input, "context.Body.strategyCode");
    if (!strategyCode) {
        errors.push("стратегия инвестирования");
    }

    const purchaseDate = getValue(input, "context.Body.purchaseDate");
    if (!purchaseDate) {
        errors.push("дата транша");
    }

    if (errors.length != 0) {
        await ambientProperties.services.confirmationDialog.showError(`Не заполнены следующие параметры: ${errors.join(", ")}.`, 'UI_BOOTSTRAP.##OK', undefined, 1);

        return;
    }

    const request = {
        method: "post",
        url: "api/core/public/data-exports/ExportNoteReport/1",
        urlParams: {
            formatterName: "ExportNoteReportExcel"
        },
        data: {
            data: {
                criteria: {
                    productCode,
                    strategyCode,
                    purchaseDate
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
            downloadLink.download = decodeURIComponent(`Выгрузка отчета`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            this.view.stopBlockingUI();
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, "UI_BOOTSTRAP.##OK", "UI_BOOTSTRAP.##CANCEL", 3, "small", { textKeySkipTranslate: true });
        });
};
