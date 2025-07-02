'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const shouldSignAttachment = sinkExchange.resolveContext('shouldSignAttachment');

    if (!shouldSignAttachment) {

        return;
    }

    const attachmentType = 'ePolicyDigitallySigned';

    return {
        entityId: sinkInput.contractId,
        attachmentType: attachmentType
    };
};
