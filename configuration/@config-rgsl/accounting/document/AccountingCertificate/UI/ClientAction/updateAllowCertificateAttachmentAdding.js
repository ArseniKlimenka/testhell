module.exports = async function updateAllowCertificateAttachmentAdding(input) {

    const targetAttachmentType = "taxDeductionCertificate";

    if (!input.rootContext.ClientViewModel.canAddAttachmentWithType) {

        input.rootContext.ClientViewModel.canAddAttachmentWithType = {
            attachmentType: targetAttachmentType,
            warningText: "Невозможно добавить более 1-го вложения данного типа"
        };
    }

    const params = {
        SequenceNumber: null,
        IncludePreviousAttachments: false,
    };

    const attachmentsMap = new Map();
    const attachmentTypes = await this.view.attachmentManager.getAvailableAttachmentTypes();
    const attachments = await this.view.attachmentManager.getAttachments({ parameters: { params: params } });

    attachmentTypes.incoming.forEach((type) => {

        const count = attachments.filter((attachment) => attachment.AttachmentType.Code === type.attachmentType).length;

        attachmentsMap.set(`${type.attachmentType}`, count);
    });

    switch (input.actionData.parameters.operationType) {
        case "Delete":
            if (attachmentsMap.get(targetAttachmentType) === 0) {

                input.rootContext.ClientViewModel.canAddAttachmentWithType.allowed = true;
            }
            else {

                input.rootContext.ClientViewModel.canAddAttachmentWithType.allowed = false;
            }
            break;
        case "Edit":
            if (attachmentsMap.get(targetAttachmentType) === 0) {

                input.rootContext.ClientViewModel.canAddAttachmentWithType.allowed = true;
            }
            else {

                input.rootContext.ClientViewModel.canAddAttachmentWithType.allowed = false;
            }
            break;
        default:
            input.rootContext.ClientViewModel.canAddAttachmentWithType.allowed = false;
    }
};
