'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoadDocumentAction(input, ambientProperties) {

    input.rootContext.ClientViewModel.shouldShowExternalAttachments = true;
    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    await fillNettingPo(input, ambientProperties);

    if (isDocumentLocked) {

        this.view.disableAllElements();
        return;
    }
};

async function fillNettingPo(input, ambientProperties) {

    const paymentOrdersRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/PODocumentSearchDataSource',
        data: {
            data: {
                criteria: {
                    parentPaymentOrderNumber: input.rootContext.Number
                }
            }
        }
    };

    let result;
    try {
        result = await ambientProperties.services.api.call(paymentOrdersRequest);
    }
    catch (err) {
        throwResponseError(err);
    }

    if (result.data && result.data.length > 0) {

        input.rootContext.ClientViewModel.nettingPoNumber = result.data[0].metadata.code;
    }
}
