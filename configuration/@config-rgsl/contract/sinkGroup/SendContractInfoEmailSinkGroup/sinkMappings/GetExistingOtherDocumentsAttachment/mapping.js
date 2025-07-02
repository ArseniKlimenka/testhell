'use strict';

const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkInput, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const productCode = sinkExchange.resolveContext('productCode');
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);
    const documentStateCode = sinkExchange.resolveContext('documentStateCode');
    const isDraft = documentStateCode == 'Draft';

    if (!isEPolicy || !isWCENOAS || (isWCENOAS && isDraft)) { return; }

    return {
        entityId: sinkInput.contractId,
        attachmentType: 'other'
    };

};
