'use strict';

/**
 * @translationKey {translationKey} AutoPopulatedSuccessfully
 */

module.exports = async function autoPopulate(input, ambientProperties) {

    const aaNumberFrom = input.rootContext.Body.aaNumberFrom;
    const sadNumberFrom = input.rootContext.Body.sadNumberFrom;

    if (!aaNumberFrom && !sadNumberFrom) {

        return;
    }

    const ONLY_OK_BUTTON = 1;
    let request = {};

    if (aaNumberFrom) {

        request = {
            method: 'post',
            url: 'api/core/shared/integration-services/PtAutoPopulate/1',
            data: {
                data: {
                    ptNumber: input.rootContext.Number,
                    aaNumberFrom: aaNumberFrom,
                    userName: input.rootContext.AuditInfo.UpdatedBy
                }
            }
        };
    }
    else if (sadNumberFrom) {

        request = {
            method: 'post',
            url: 'api/core/shared/integration-services/PtAutoPopulate/1',
            data: {
                data:{
                    ptNumber: input.rootContext.Number,
                    sadNumberFrom: sadNumberFrom,
                    userName: input.rootContext.AuditInfo.UpdatedBy
                }
            }
        };
    }

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        let errorMsg = undefined;

        if (err.error) {
            if (err.error.data) {
                const errData = err.error.data;
                if (errData.errorResponse) {
                    errorMsg = errData.errorResponse.code + ': ' + errData.errorResponse.message;
                }
                else if (errData.validationErrors) {
                    errorMsg = errData.validationErrors
                        .map(_ => _.message)
                        .join('\n');
                }
                else {
                    errorMsg = 'Internal error';
                }
            }
            else {
                errorMsg = err.error.Message;
            }
        }

        ambientProperties.services.confirmationDialog.showError(errorMsg ? errorMsg : err.toString(), 'OK', 'Cancel', ONLY_OK_BUTTON);
    }
    finally {
        this.view.stopBlockingUI();
        this.view.search();
    }

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.AutoPopulatedSuccessfully', 'OK', 'Cancel', ONLY_OK_BUTTON);
};
