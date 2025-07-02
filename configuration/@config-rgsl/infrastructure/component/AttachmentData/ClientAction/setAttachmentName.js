/**
 * Sets attachment name to attachment type name (if the attachment name is not already specified).
 */
module.exports = function setAttachmentName(input) {
    const {
        data,
        context
    } = input;

    let customItemName;

    if (input.rootContext?.ClientViewModel?.attachmentsCommentMap && data.attachmentType) {

        customItemName = input.rootContext.ClientViewModel.attachmentsCommentMap.find(x=>x.attachmentType === data.attachmentType)?.customName;
    }

    if (data.attachmentType && context.Body && context.Body.availableAttachmentTypes) {
        const attachmentType = context.Body.availableAttachmentTypes.find(att => data.attachmentType === att.type);
        if (attachmentType) {
            if (!data.attachmentName || (data.attachmentName !== customItemName)) {
                // If attachment name is not already specified, we set it to attachment type name.
                data.attachmentName = customItemName ?? attachmentType.typeName;
            } else {
                const attachmentNameIsDefault = context.Body.availableAttachmentTypes.find(att => data.attachmentName === att.typeName);

                if (attachmentNameIsDefault) {
                    // Change attachment name when it is already defined and is one of availableAttachmentNames
                    data.attachmentName = attachmentType.typeName;
                }
            }
        }
    }
};
