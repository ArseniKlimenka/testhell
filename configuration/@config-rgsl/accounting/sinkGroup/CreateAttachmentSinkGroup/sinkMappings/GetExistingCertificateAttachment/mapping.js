'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const attachmentType = 'taxDeductionCertificate';

    return {
        entityId: sinkInput.documentId,
        attachmentType: attachmentType
    };
};
