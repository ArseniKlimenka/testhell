'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.endowmentId = input.UNIVERSAL_DOCUMENT_ID;
    output.attachmentId = input.ATTACHMENT_ID;
    output.attachmentType = input.ATTACHMENT_TYPE;
    output.attachmentName = input.ATTACHMENT_NAME;
    output.fileMetadataId = input.FILE_METADATA_ID;
    output.createdOn = input.SYS_CREATED_ON.slice(0, 10);
    return output;

};
