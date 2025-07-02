/**
 * @translationKey {translationKey} UploadedSuccessfully
 */

module.exports = async function upload(input, ambientProperties) {

    const translate = ambientProperties.services.translate.getSync;
    const body = input.context.Body;

    const request = {
        method: 'POST',
        url: 'api/core/shared/integration-services/RsdPopulateViaFile/1',
        data: {
            data: {
                rsdNumber: body.rsdNumber,
                importFileId: body.file.fileId,
            }
        }
    };

    const result = await ambientProperties.services.api.call(request)
        .catch(error => {
            throw error.message;
        });
    showSuccessMessage(body, result.data, translate, ambientProperties);

    input.context.dialogContext.closeDialog();
};

function showSuccessMessage(body, result, translate, ambientProperties) {
    const ONLY_OK_BUTTON = 1;

    const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'UploadedSuccessfully', {
        totalFileItemsCount: result.importedCount + result.failedItems.length,
        processedCount: result.importedCount,
    });
    ambientProperties.services.confirmationDialog.showNotification(msg, 'OK', 'Cancel', ONLY_OK_BUTTON);
}
