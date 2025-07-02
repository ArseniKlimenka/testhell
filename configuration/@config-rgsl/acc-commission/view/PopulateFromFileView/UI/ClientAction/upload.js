const { raiseActItemsChangedEvent } = require('@config-rgsl/acc-commission/lib/actUtils');

/**
 * @translationKey {translationKey} SkipErrors
 * @translationKey {translationKey} UploadedSuccessfully
 */

module.exports = async function upload(input, ambientProperties) {
    const OK_AND_CANCEL_BUTTON = 3;
    const translate = ambientProperties.services.translate.getSync;
    const body = input.context.Body;

    const request = {
        method: 'POST',
        url: 'api/rgsl/accounting/shared/commission/act/populate-with-file',
        data: {
            actId: body.actId,
            actNo: body.actNo,
            fileId: body.file.fileId,
            lastUpdated: body.lastUpdated,
        }
    };

    let skipErrors = false;
    await ambientProperties.services.api.call(request)
        .then(_ => showSuccessMessage(_, translate, ambientProperties), async (err) => {
            let errorMsg = undefined;

            if (err.error && err.error.Message) {
                errorMsg = err.error.Message;
            }
            else if (err.message) {
                errorMsg = err.message;
            }

            const error = errorMsg ? errorMsg : err.toString();
            let msg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'SkipErrors', { error: error });
            msg = msg.replaceAll('\r\n', '<br />');
            msg = msg.replaceAll('\n', '<br />');
            skipErrors = await ambientProperties.services.confirmationDialog.showError(msg, 'OK', 'Cancel', OK_AND_CANCEL_BUTTON);
        })
        .catch(error => {
            throw error.message;
        });

    if (skipErrors) {
        request.data.skipFailed = true;

        await ambientProperties.services.api.call(request).then(_ => showSuccessMessage(_, translate, ambientProperties));
    }

    const { dialogContext } = input.context;

    raiseActItemsChangedEvent(ambientProperties);

    dialogContext.closeDialog();
};

function showSuccessMessage(result, translate, ambientProperties) {
    const ONLY_OK_BUTTON = 1;

    const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'UploadedSuccessfully', {
        totalFileItemsCount: result.totalFileItemsCount,
        processedCount: result.processedCount,
    });
    ambientProperties.services.confirmationDialog.showNotification(msg, 'OK', 'Cancel', ONLY_OK_BUTTON);
}
