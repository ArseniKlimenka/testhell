"use strict";

const {
    updateTaxPayerData
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const party = sinkResult.data[0].resultData;
    updateTaxPayerData(sinkExchange.body, party);
};
