'use strict';

const { productGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkInput, sinkExchange) {

    const body = sinkInput.body;
    const productGroupCode = body?.productConfiguration?.productGroupCode;
    if (productGroupCode != productGroup.NS.descriptionRU) {
        return;
    }

    const newKidFileId = sinkExchange.resolveContext('newKidFileId');
    const existedKidAttachmentId = sinkExchange.resolveContext('existedKidAttachmentId');
    const contractId = sinkInput.id;

    if (!newKidFileId || existedKidAttachmentId) {

        return;
    }

    return {
        fileId: newKidFileId,
        entity: {
            entityId: contractId
        }
    };
};
