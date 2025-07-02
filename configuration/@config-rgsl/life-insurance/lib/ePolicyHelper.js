'use strict';

const { getCurrentAttachments } = require('@config-rgsl/infrastructure/lib/AttachmentsViewHelperImpl');

async function deleteEPolicyAttachments(attachmentManager, input) {

    const attachmentTypesToDelete = ["ePolicy", "memoCB"];
    input.rootContext.Body.issueForm.polciyHolderIsPayer = false;
    const attachments = await getCurrentAttachments(attachmentManager, input) || [];
    const attachmentsToDelete = attachments.filter(a => attachmentTypesToDelete.includes(a.AttachmentType.Code));

    attachmentsToDelete.forEach(element => {

        element.UploadStatus = "PendingDeletion";
        attachmentManager.deleteAttachment(element.AttachmentId);
    });
}

module.exports = {
    deleteEPolicyAttachments
};
