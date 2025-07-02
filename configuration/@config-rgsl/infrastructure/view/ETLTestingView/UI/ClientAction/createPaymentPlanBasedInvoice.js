const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function createPaymentPlanBasedInvoice(input, ambientProperties) {

    if (input.data.Body.jointInvoicing) {
        input.data.Body.contractNoPayPlanInv = null;
    }

    // Call api for creating invoice per policy
    const request = {
        method: 'POST',
        url: 'api/core/shared/etl-services/PreparePaymentPlanBasedInvoiceETLService/1',
        data: {
            data: {
                contractNumber: input.data.Body.contractNoPayPlanInv,
                postingDateTo: input.data.Body.installmentsUntil,
            }
        },
        returnHttpPromise: true
    };

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

    ambientProperties.services.confirmationDialog.showNotification('Invoice generation has started', 'OK', '', 1);
};
