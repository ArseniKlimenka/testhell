'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const attachmentType = 'InvApplicationAttachment';

    return {
        entityId: sinkInput.contractId,
        attachmentType: attachmentType
    };

};
