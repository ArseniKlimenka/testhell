/**
 * Checks if attachment length is 1 or if it is in edit mode - used for hiding delete button on editing attachment.
 */
module.exports = function hideDeleteButtonOnEdit(input) {
    if (input && input.context && input.context.attachments && input.context.attachments.length === 1) {
        return true;
    }

    return input.context.Body.isEdit;
};
