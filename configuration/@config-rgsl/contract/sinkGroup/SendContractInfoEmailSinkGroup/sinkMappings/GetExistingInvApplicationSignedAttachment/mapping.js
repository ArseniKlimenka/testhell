'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const documentStateCode = sinkExchange.resolveContext('documentStateCode');
    const isActive = documentStateCode == 'Active';

    if (!isActive) { return; }

    const attachmentType = 'InvApplicationSignedAttachment';

    return {
        entityId: sinkInput.contractId,
        attachmentType: attachmentType
    };

};
