/**
 * Removes attachment from the array of attachments for upload.
 */
module.exports = function removeAttachmentFromUpload(input) {
    // Parent form contains the attachments for upload array.
    const parent = input.context;
    const index = parent.attachments.indexOf(input.data);

    if (index > -1) {
        // Remove the attachment from the array
        parent.attachments.splice(index, 1);

        if (parent.attachments.length === 1) {
            this.triggerChangeEvent();
        }
    }
};
