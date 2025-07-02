'use strict';

const {
    getAttachmentDataByTypeForSink
} = require("@config-rgsl/infrastructure/lib/AttachmentsSinkHelper");

module.exports = function mapping(input) {

    return getAttachmentDataByTypeForSink(input.amendmentId, input.requestAttachmentsWithFileId, 'investmentParametersEditApplication');

};
