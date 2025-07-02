"use strict";

const {
    setDocumentCodeView
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    setDocumentCodeView(sinkExchange.body, sinkResult, 'taxPayerData');
};
