'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.contractId = input.CONTRACT_ID;
    output.attachmentId = input.ATTACHMENT_ID;
    output.attachmentType = input.ATTACHMENT_TYPE;
    output.attachmentName = input.ATTACHMENT_NAME;
    output.fileMetadataId = input.FILE_METADATA_ID;
    output.createdOn = input.SYS_CREATED_ON.slice(0, 10);
    output.createdOnDateTime = input.SYS_CREATED_ON;
    output.fileName = input.FILENAME;
    output.mediaType = input.MEDIA_TYPE;
    output.totalSize = input.TOTAL_SIZE;
    output.entity = input.ENTITY;
    return output;

};
