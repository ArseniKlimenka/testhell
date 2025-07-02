module.exports = function downloadAllAttachments(input) {

    const attachments = input.context.Body.attachments || [];

    attachments.forEach(item => this.view.getParentView().attachmentManager.downloadAttachment(item.attachmentId));

};
