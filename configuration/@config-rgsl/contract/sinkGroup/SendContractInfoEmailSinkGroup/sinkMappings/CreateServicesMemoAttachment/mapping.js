'use strict';

const { getTranslationByPrintoutRelationType } = require('@config-rgsl/infrastructure/lib/translationHelper');

module.exports = function mapping(sinkResult, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';

    if (!isEPolicy) { return; }

    const fileIds = sinkExchange.resolveContext('servicesMemoAttachmentFileIds');
    const attachmentIds = sinkExchange.resolveContext('servicesMemoAttachmentIds');
    const contractId = sinkExchange.resolveContext('contractId');

    if (!fileIds || fileIds.length == 0 || (attachmentIds && attachmentIds.length > 0)) {

        return;
    }

    const servicesMemoAttachments = fileIds.map(item => {

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

    return servicesMemoAttachments;

};
