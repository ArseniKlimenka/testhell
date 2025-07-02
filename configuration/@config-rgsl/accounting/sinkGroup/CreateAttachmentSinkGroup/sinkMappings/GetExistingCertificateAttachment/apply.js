'use strict';

const attachmentsConst = require("@config-rgsl/infrastructure/lib/AttachmentsConsts");

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult && sinkResult.length > 0) {

        let attachments = sinkResult;
        attachments = attachments.filter(item => [
            attachmentsConst.attachmentUploadStatus.pendingUpload,
            attachmentsConst.attachmentUploadStatus.uploaded,
        ].includes(item.UploadStatus));

        attachments = attachments.filter(item => item.AttachmentType === 'taxDeductionCertificate');

        if (attachments.length > 0) {
            sinkExchange.mapContext('certificateAttachmentId', attachments[0].AttachmentId);
            sinkExchange.mapContext('certificateAttachmentFileId', attachments[0].FileMetadataId);
        }
    }
};
