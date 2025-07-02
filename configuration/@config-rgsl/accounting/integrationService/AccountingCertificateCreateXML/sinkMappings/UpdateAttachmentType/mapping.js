'use strict';

const { taxAttachmentType } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function accountingCertificateMapping(sinkInput, sinkExchange) {

    const items = sinkExchange.requestArray.map(item => ({
        CERTIFICATE_NUMBER: item.UniversalVersionedDocumentNo,
        ATTACHMENT_TYPE: 'XML'
    }));

    const result = {

        'ACC_IMPL.CRT_ATTACHMENT_TYPE_SAT': items
    };

    return result;

};
