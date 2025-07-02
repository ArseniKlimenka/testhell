"use strict";

const {
    setContractTypeDescription
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    setContractTypeDescription(sinkExchange.body, sinkResult);
};
