/**
 * Downloads specific attachment.
 */
module.exports = function downloadAttachment(input) {
    this.view.getParentView().attachmentManager.downloadAttachment(input.data.attachmentId);
};
