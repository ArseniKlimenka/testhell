'use strict';

const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkResult, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const productCode = sinkExchange.resolveContext('productCode');
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);
    const documentStateCode = sinkExchange.resolveContext('documentStateCode');
    const isDraft = documentStateCode == 'Draft';

    if (!isEPolicy || !isWCENOAS || (isWCENOAS && isDraft)) {

        return;
    }

    const otherDocumentsAttachmentId = sinkExchange.resolveContext('otherDocumentsAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');

    if (otherDocumentsAttachmentId && otherDocumentsAttachmentId.length > 0) {

        return;
    }

    const printoutsinfo = sinkExchange.resolveContext('printoutsInfo');
    const info = printoutsinfo.find(p => p.PrintoutName === 'wcenoasAdditionalDocumentsPrintout');

    return {
        printoutRelations: [
            {
                codeName: info.AttachmentType,
                mode: 'WriteFile'
            }
        ],
        entity: {
            id: contractId
        }
    };
};
