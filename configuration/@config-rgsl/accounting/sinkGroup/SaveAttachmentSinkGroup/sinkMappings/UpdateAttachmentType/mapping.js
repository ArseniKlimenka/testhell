'use strict';

const { taxAttachmentType } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function accountingCertificateMapping(sinkInput, sinkExchange) {

    const result = {

        'ACC_IMPL.CRT_ATTACHMENT_TYPE_SAT': [{
            CERTIFICATE_NUMBER: sinkInput.number,
            ATTACHMENT_TYPE: 'PDF',
        }],
    };

    return result;

};
