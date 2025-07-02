'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const data = getValue(sinkResult, 'data');

    if (!data || data.length === 0) {

        return;
    }

    const netteditems = sinkExchange.resolveContext('nettedItems');

    if (!netteditems) {

        return;
    }

    const paymentOrder = sinkResult.data[0].resultData;

    netteditems.forEach(item => {

        const document = paymentOrder.body.paymentOrderNetting.nettedDocuments.find(doc => doc.documentNumber === item.DocumentNo);
        document.currentBankStatementNo = item.BankStatementNo;
        document.currentBankStatementId = item.BankStatementId;
    });

    sinkExchange.mapContext('paymentOrderData', paymentOrder.body);
};
