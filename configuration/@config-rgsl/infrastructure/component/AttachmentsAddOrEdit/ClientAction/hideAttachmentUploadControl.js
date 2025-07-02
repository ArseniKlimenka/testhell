/**
 * Hides attachment upload control if we just chose one or more attachments for upload or if the attachment is in edit mode.
 */
module.exports = function hideAttachmentUploadControl(input) {
    if (input && input.context && input.context.attachments && input.context.attachments.length > 0) {
        // Hide file upload control when we are adding attachment and have at least one attachment chosen for upload
        return true;
    }

    return input.context.Body.isEdit;
};
