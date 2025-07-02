'use strict';

module.exports = function mapping(input, sinkExchange) {

    const fileId = sinkExchange.resolveContext('certificateAttachmentFileId');
    const attachmentId = sinkExchange.resolveContext('certificateAttachmentId');
    const contractNumber = input.contractNumber;
    const accountingYear = input.accountingYear;
    const correctionNumber = input.correctionNumber;
    const customName = `СПРАВКА_${contractNumber}_${accountingYear ?? ''}_${correctionNumber ?? ''}`;
    const printoutFileExtension = '.pdf';

    if (!fileId || attachmentId) {

        return;
    }

    return {
        fileId: fileId,
        entity: {
            entityId: input.documentId
        },
        fileName: `${customName}${printoutFileExtension}`,
        attachmentName: customName
    };
};
