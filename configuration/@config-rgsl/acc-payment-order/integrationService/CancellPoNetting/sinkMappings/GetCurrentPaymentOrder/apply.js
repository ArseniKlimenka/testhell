'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const sourceBody = sinkResult.data[0].resultData.body;
    const bankStatementItemIds = sourceBody.paymentOrderNetting.nettedDocuments.map(i => i.currentBankStatementId);
    sinkExchange.sourceBody = sourceBody;
    sinkExchange.bankStatementItemIds = bankStatementItemIds;
};
