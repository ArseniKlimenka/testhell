"use strict";

const {
    updateInsuredPersonData
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const party = sinkResult.data[0].resultData;
    updateInsuredPersonData(sinkExchange.body, party);
};
