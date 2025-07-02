"use strict";

const {
    setDescription
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    setDescription(sinkExchange.body, sinkResult);
};
