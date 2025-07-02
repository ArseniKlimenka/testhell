'use strict';

module.exports = async function exportPaymentIntermediateApplicationReport(input, ambientProperties) {

    const body = input.context.Body;

    const partnerCode = body.paymentIntermediateApplicationReportPartner?.partnerCode;

    const request = {
        method: "post",
        url: "api/core/public/data-exports/ExportPaymentIntermediateApplicationReport/1",
        urlParams: {
            formatterName: "ExportPaymentIntermediateApplicationReportExcel"
        },
        data: {
            data: {
                criteria: {
                    contractNumber: body.paymentIntermediateApplicationReportСontractNumber,
                    issueDateFrom: body.paymentIntermediateApplicationReportIssueDateFrom,
                    issueDateTo: body.paymentIntermediateApplicationReportIssueDateTo,
                    productCode: body.paymentIntermediateApplicationReportProductCode,
                    partnerCode: partnerCode
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
            downloadLink.download = decodeURIComponent(`Промежуточная выплата`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            return;
        }).catch(error => {
            this.view.stopBlockingUI();
            const errorMessage = error.error && error.error.Message || error.message || error;
            ambientProperties.services.confirmationDialog.showError(errorMessage, "UI_BOOTSTRAP.##OK", "UI_BOOTSTRAP.##CANCEL", 3, "small", { textKeySkipTranslate: true });
        });
};
