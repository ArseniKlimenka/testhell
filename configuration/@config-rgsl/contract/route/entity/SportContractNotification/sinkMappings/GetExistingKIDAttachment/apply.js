'use strict';

const attachmentsConst = require("@config-rgsl/infrastructure/lib/AttachmentsConsts");

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult && sinkResult.length > 0) {

        sinkResult.filter(item => item.UploadStatus === attachmentsConst.attachmentUploadStatus.uploaded);
        const lastAttachment = sinkResult.reduce(function (a, b) { return a.ReceiptDate > b.ReceiptDate ? a.ReceiptDate : b.ReceiptDate; });
        sinkExchange.mapContext('existedKidAttachmentId', lastAttachment.AttachmentId);
    }
};
