'use static';

const { accountingCertificateAttachmentTypes } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function mapping(input, sinkExchange) {

    return {
        dto: {
            AttachmentType: accountingCertificateAttachmentTypes.taxDeductionCertificate,
            EntityId: input.documentId
        }
    };
};
