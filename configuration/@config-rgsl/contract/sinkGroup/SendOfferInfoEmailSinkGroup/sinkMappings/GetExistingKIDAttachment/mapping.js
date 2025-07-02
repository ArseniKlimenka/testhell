'use strict';

module.exports = function mapping(sinkInput) {

    return {
        entityId: sinkInput.contractId,
        attachmentType: 'KIDAttachment'
    };

};
