'use strict';

const attachmentsConst = require("@config-rgsl/infrastructure/lib/AttachmentsConsts");

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult && sinkResult.length > 0) {

        const uploadedDocuments = sinkResult.filter(item => item.UploadStatus === attachmentsConst.attachmentUploadStatus.uploaded);
        const lastAttachment = uploadedDocuments.reduce(function (a, b) { return a.ReceiptDate > b.ReceiptDate ? a.ReceiptDate : b.ReceiptDate; });
        sinkExchange.mapContext('existedInsuranceRulesAttachmentId', lastAttachment.AttachmentId);
    }
};
