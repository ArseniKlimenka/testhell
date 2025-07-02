'use strict';

/**
 * Sets filter parameters and get attachment object for sink mapping.
 *
 * @param {Object} input - Sink input
 * @param {Object} context - Sink context
 * @param {Object} additionalDataSourcesData - Sink additional data sources
 * @param {String} attachmentType - Attachment type to check in array of attachments
 */
function getAttachmentDataByTypeForSink(amendmentId, requestAttachmentsWithFileId, attachmentType) {

    const attachmentByType = requestAttachmentsWithFileId.filter(attachment => attachment.attachmentType == attachmentType);
    const isAttachmentTypeInConfig = attachmentByType.length > 0;

    if (!amendmentId || !isAttachmentTypeInConfig) {
        return;
    }

    return attachmentByType.map((item) => {
        return {
            fileId: item.fileMetadataId,
            entity: {
                entityId: amendmentId
            },
            attachmentName: item.attachmentName
        };
    });

}

module.exports = {
    getAttachmentDataByTypeForSink: getAttachmentDataByTypeForSink
};
