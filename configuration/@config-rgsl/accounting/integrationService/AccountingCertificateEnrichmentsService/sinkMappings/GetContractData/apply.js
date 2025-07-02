"use strict";

const {
    updatePolicyData
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');
const { highlightErrorMessage } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length === 1) {
        updatePolicyData(sinkResult, sinkExchange.body);
    } else {
        const errorMsg = `E: Договор ${sinkExchange.body.contract.number} не найден в системе`;
        throw new Error(highlightErrorMessage(errorMsg));
    }
};
