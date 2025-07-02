const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { refreshAttachments } = require('@config-rgsl/infrastructure/lib/AttachmentsViewHelperImpl');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function fileUploadSpecial(input, ambientProperties) {

    const parentView = this.view.getParentView();

    const dataProperty = input.dataProperty;
    const attachmentTypes = input.context.Body.attachmentTypes;

    const uploadedFile = input.context.Body[dataProperty][0];
    const attachmentType = dataProperty;
    const attachmentName = attachmentTypes.find(item => item.type == dataProperty).typeName;

    const attachmentsToUpload = [{
        AttachmentType: attachmentType,
        File: uploadedFile.file,
        FileName: uploadedFile.file.name,
        MediaType: uploadedFile.file.type,
        Name: attachmentName,
        ReceiptDate: new Date()
    }];

    let result;
    try {
        this.view.startBlockingUI();
        result = await parentView.attachmentManager.uploadAttachments(attachmentsToUpload);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    refreshAttachments(this.view, input);

};
