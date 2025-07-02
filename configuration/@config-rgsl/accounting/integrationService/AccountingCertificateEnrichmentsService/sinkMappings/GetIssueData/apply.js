"use strict";

const {
    updateIssueData
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const party = sinkResult.data[0].resultData;
    updateIssueData(sinkExchange.body, party);
};
