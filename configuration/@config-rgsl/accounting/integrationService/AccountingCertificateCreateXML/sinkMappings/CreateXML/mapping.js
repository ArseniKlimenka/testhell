'use static';

const { accountingCertificateAttachmentTypes } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    const result = {};

    result.Request = sinkExchange.requestArray;

    return {
        request: result
    };
};
