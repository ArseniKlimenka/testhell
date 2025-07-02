'use strict';

module.exports = function mapping(sinkResult, sinkExchange) {

    const body = sinkResult.body;
    const policyPrintout = body?.productConfiguration?.policyPrintout;
    if (policyPrintout != "sportPolicy") {
        return;
    }

    const newContractFileId = sinkExchange.resolveContext('newContractFileId');
    const existedContractAttachmentId = sinkExchange.resolveContext('existedContractAttachmentId');
    const contractId = sinkResult.id;

    if (!newContractFileId || existedContractAttachmentId) {

        return;
    }

    return {
        fileId: newContractFileId,
        entity: {
            entityId: contractId
        }
    };
};
