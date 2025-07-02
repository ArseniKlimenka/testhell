'use static';

const { accountingCertificateAttachmentTypes } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    return {
        documentId: sinkInput.documentId
    };
};
