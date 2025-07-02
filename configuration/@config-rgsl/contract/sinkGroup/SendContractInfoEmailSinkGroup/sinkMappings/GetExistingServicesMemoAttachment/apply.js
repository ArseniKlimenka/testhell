'use strict';

const attachmentsConst = require("@config-rgsl/infrastructure/lib/AttachmentsConsts");

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult && sinkResult.length > 0) {

        const uploadedServicesMemoAttachments = sinkResult.filter(item => item.UploadStatus === attachmentsConst.attachmentUploadStatus.uploaded);
        const servicesMemoAttachmentIds = uploadedServicesMemoAttachments.map(item => item.AttachmentId);
        sinkExchange.mapContext('servicesMemoAttachmentIds', servicesMemoAttachmentIds);
    }
};
