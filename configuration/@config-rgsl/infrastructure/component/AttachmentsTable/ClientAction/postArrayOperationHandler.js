const {
    refreshAttachments
} = require('@config-rgsl/infrastructure/lib/AttachmentsViewHelperImpl');

/**
 * Processes added / edited attachments and raises proper event for attachments upload / update.
 */
module.exports = async function postArrayOperationHandler(input, ambientProperties) {
    const {
        affectedRow,
        operationType,
    } = input;

    const checkResult = attachmentTableInteractionCheck(input, operationType);

    if (!checkResult.attachmentActionIsAllowed) {

        ambientProperties.services.confirmationDialog.showWarning(checkResult.warningText, 'OK', '', 1);
        return;
    }

    if (operationType === 'Add') {

        affectedRow.isEditable = false;
        affectedRow.isDeletable = false;

        // Once array holds the new entry, call the service to start the upload
        await _addAttachments(this.view, input, ambientProperties, affectedRow);

    } else if (operationType === 'Edit') {

        // Once array holds the updated / new entry, call the service to start the update / upload
        if (input.affectedRow.Body.isEdit) {
            await _updateAttachment(this.view, input, affectedRow, ambientProperties);
        } else {
            affectedRow.isEditable = false;
            affectedRow.isDeletable = false;

            await _addAttachments(this.view, input, ambientProperties, affectedRow);
        }
    } else if (operationType === 'Delete') {
        this.view.startBlockingUI('FRAMEWORK.##LOADING');
        await this.view.getParentView().attachmentManager.deleteAttachment(affectedRow.attachmentId);
        refreshAttachments(this.view, input);
    }

    await raiseAttachmentEvent(input, ambientProperties);
};


/**
 * Starts uploading attachments by raising the appropriate event.
 *
 * @param {*} view - Current view
 * @param {*} input - The view's data
 * @param {object} affectedRow - Attachments to be uploaded
 * @param {object} ambientProperties - Client action's ambient properties
 */
async function _addAttachments(view, input, ambientProperties, affectedRow) {
    view.startBlockingUI('FRAMEWORK.##LOADING');
    const attachments = [];
    affectedRow.attachments.forEach(attachment => {
        attachments.push({
            AttachmentType: attachment.attachmentType,
            Name: attachment.attachmentName,
            ReceiptDate: attachment.receiptDate,
            FileName: attachment.file.name,
            MediaType: attachment.file.type,
            AttachmentDescription: attachment.description,
            File: attachment.file
        });
    });

    view.startBlockingUI('FRAMEWORK.##LOADING');
    try {
        await view.getParentView().attachmentManager.uploadAttachments(attachments);
    }
    catch (error) {
        ambientProperties.services.confirmationDialog.showWarning(error.message);
        refreshAttachments(view, input);
    }
    refreshAttachments(view, input);
}

/**
 * Starts updating an attachment by raising the appropriate event.
 *
 * @param {*} view - Current view
 * @param {*} input - The view's data
 * @param {object} affectedRow - Attachment to be updated
 * @param {object} ambientProperties - Client actions ambient properties
 */
async function _updateAttachment(view, input, affectedRow, ambientProperties) {
    const attachment = {
        AttachmentId: affectedRow.attachmentId,
        AttachmentType: affectedRow.attachmentType,
        Name: affectedRow.attachmentName,
        AttachmentDescription: affectedRow.description,
        ReceiptDate: affectedRow.receiptDate,
    };

    view.startBlockingUI('FRAMEWORK.##RELOADING');
    await view.getParentView().attachmentManager.updateAttachment(attachment);
    refreshAttachments(view, input);
}

async function raiseAttachmentEvent(input, ambientProperties) {

    const eventArgs = {};

    eventArgs.parameters = {
        affectedRow: input.affectedRow,
        operationType: input.operationType
    };

    await ambientProperties.services.util.raiseEvent('ATTACHMENT_ACTION_COMPLETED', eventArgs);
}

function attachmentTableInteractionCheck(input, operationType) {

    let attachmentActionIsAllowed = true;

    if (operationType === 'Add'
        && input.affectedRow.attachments[0].attachmentType === input.rootContext?.ClientViewModel?.canAddAttachmentWithType?.attachmentType) {

        attachmentActionIsAllowed = input.rootContext?.ClientViewModel?.canAddAttachmentWithType?.allowed ?? false;
    }
    else if (operationType === 'Edit'
        && input.affectedRow.attachmentType === input.rootContext?.ClientViewModel?.canAddAttachmentWithType?.attachmentType) {

        attachmentActionIsAllowed = input.rootContext?.ClientViewModel?.canAddAttachmentWithType?.allowed ?? false;
    }

    return {
        attachmentActionIsAllowed: attachmentActionIsAllowed,
        warningText: input.rootContext?.ClientViewModel?.canAddAttachmentWithType?.warningText
    };
}
