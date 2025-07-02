"use strict";

const {
    setAccountingYear
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const accountingYear = sinkExchange.body?.accountingYear?.year;

    setAccountingYear(accountingYear, sinkResult);
};
