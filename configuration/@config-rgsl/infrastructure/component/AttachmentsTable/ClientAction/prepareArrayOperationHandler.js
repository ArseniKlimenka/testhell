/**
 * Prepares attachments for uploading / editing.
 */
module.exports = function prepareArrayOperationHandler(input, ambientProperties) {
    const {
        affectedRow,
        operationType,
        context
    } = input;

    // If something prevents us from even starting the action, throw exception message.
    if (!input.rootContext.IsSaved) {
        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.services.translate.getSync("UI_BASE", "##NEED_TO_SAVE_FIRST"));
        return false;
    } else if (affectedRow.flow === 'Incoming' && input.data.attachmentTypes.length === 0) {
        throw ambientProperties.services.translate.getSync("UI_BASE", "##NO_ATTACHMENT_TYPES_AVAILABLE");
    }

    // Initialize attachment types for current operation:
    affectedRow.Body = {
        availableAttachmentTypes: [...context.Body.attachmentTypes]
    };

    // Edit button can be used as a shortcut for uploading expected attachments - in this case we have to handle it as an 'add' instead.
    affectedRow.Body.isEdit = false;

    if (operationType === "Edit") {
        if (affectedRow.uploadStatus === 'PendingUpload') {
            affectedRow.receiptDate = new Date();
        } else {
            affectedRow.Body.isEdit = true;

            // If editing an attachment with a type that is currently unavailable, add it so that it's displayed properly:
            if (!context.Body.attachmentTypes.some(attachmentType => attachmentType.type === affectedRow.attachmentType)) {
                context.Body.attachmentTypes.push({
                    type: affectedRow.attachmentType,
                    typeName: affectedRow.attachmentTypeName
                });
            }
        }
    }

    return true;
};
