'use strict';

const { getTranslationByPrintoutRelationType } = require('@config-rgsl/infrastructure/lib/translationHelper');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkResult, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const productCode = sinkExchange.resolveContext('productCode');
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);
    const documentStateCode = sinkExchange.resolveContext('documentStateCode');
    const isDraft = documentStateCode == 'Draft';

    if (!isEPolicy || !isWCENOAS || (isWCENOAS && isDraft)) { return; }

    const fileIds = sinkExchange.resolveContext('otherDocumentsAttachmentFileIds');
    const attachmentIds = sinkExchange.resolveContext('otherDocumentsAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');

    if (!fileIds || fileIds.length == 0 || (attachmentIds && attachmentIds.length > 0)) {

        return;
    }

    const otherDocumentsAttachments = fileIds.map(item => {

        const translatedFileName = getTranslationByPrintoutRelationType(sinkResult.contractConfName, item.type);

        return {
            fileId: item.fileId,
            entity: {
                entityId: contractId
            },
            fileName: translatedFileName,
            attachmentName: translatedFileName,
            attachmentDescription: translatedFileName,
        };
    });

    return otherDocumentsAttachments;

};
