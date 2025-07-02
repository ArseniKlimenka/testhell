'use strict';

const { productGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkInput) {

    const body = sinkInput.body;
    const productGroupCode = body?.productConfiguration?.productGroupCode;
    if (productGroupCode != productGroup.NS.descriptionRU) {
        return;
    }

    return {
        entityId: sinkInput.id,
        attachmentType: 'KIDAttachment'
    };

};
