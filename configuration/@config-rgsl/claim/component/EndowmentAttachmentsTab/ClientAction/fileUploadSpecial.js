const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
// const { refreshAttachments } = require('@config-rgsl/infrastructure/lib/AttachmentsViewHelperImpl');

module.exports = async function fileUploadSpecial(input, ambientProperties) {

    this.view.startBlockingUI();

    const dataProperty = input.dataProperty;

    const uploadedFile = getValue(input, `context.${dataProperty}`)[0];
    const attachmentType = dataProperty;

    const attachmentsToUpload = [{
        AttachmentType: attachmentType,
        File: uploadedFile.file,
        FileName: uploadedFile.file.name,
        MediaType: uploadedFile.file.type,
        Name: '',
        ReceiptDate: new Date()
    }];

    let result;
    try {
        this.view.startBlockingUI();
        result = await this.view.attachmentManager.uploadAttachments(attachmentsToUpload);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    this.view.attachmentManager.reloadAttachments();
    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
