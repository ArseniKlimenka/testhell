'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const attachmentType = 'offer';

    return {
        entityId: sinkInput.contractId,
        attachmentType: attachmentType
    };
};
