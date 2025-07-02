'use strict';

const attachmentsConst = require("@config-rgsl/infrastructure/lib/AttachmentsConsts");

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult && sinkResult.length > 0) {

        const uploadedOtherDocumentsAttachments = sinkResult.filter(item => item.UploadStatus === attachmentsConst.attachmentUploadStatus.uploaded);
        const otherDocumentsAttachmentId = uploadedOtherDocumentsAttachments.map(item => item.AttachmentId);
        sinkExchange.mapContext('otherDocumentsAttachmentId', otherDocumentsAttachmentId);
    }
};
