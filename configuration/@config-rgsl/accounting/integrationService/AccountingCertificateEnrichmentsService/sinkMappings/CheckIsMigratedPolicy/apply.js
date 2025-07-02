"use strict";

const {
    checkIsMigratedPolicy,
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    checkIsMigratedPolicy(sinkResult, sinkExchange.body);
};
