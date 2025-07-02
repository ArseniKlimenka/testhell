'use strict';

module.exports = function mapping(input, sinkExchange) {

    const attachmentId = sinkExchange.resolveContext('certificateAttachmentId');

    if (attachmentId) {

        return;
    }

    const printoutType = 'TaxCertificatePrintout';
    const printoutsinfo = sinkExchange.resolveContext('printoutsInfo');
    const info = printoutsinfo.find(p => p.PrintoutName === printoutType);

    if (!info) {

        return;
    }

    return {
        printoutRelations: [
            {
                codeName: info.AttachmentType,
                mode: 'WriteFile',
            }
        ],
        entity: {
            id: input.documentId
        }
    };
};
