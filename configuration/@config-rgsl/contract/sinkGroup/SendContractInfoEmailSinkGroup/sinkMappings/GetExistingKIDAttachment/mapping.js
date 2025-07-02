'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const attachmentType = 'KIDAttachment';

    return {
        entityId: sinkInput.contractId,
        attachmentType: attachmentType
    };

};
