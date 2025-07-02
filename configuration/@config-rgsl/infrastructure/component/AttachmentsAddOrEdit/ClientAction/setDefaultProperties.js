/**
 * Sets default attachment properties and calls rules reevaluation.
 */
module.exports = function setDefaultProperties(input) {
    if (input && input.context && input.context.attachments && input.context.attachments.length > 0) {
        input.context.attachments.forEach(attachment => {
            attachment.receiptDate = new Date();

            if (input.context.attachmentType) {
                // In case we are uploading required attachments through 'edit' shortcut
                attachment.attachmentType = input.context.attachmentType;
                attachment.attachmentName = input.context.Body.availableAttachmentTypes.find(att => input.context.attachmentType === att.type).typeName;
            }
        });
    }

    // Reevaluate rules to hide file upload control
    this.view.reevaluateRules("#");
};
