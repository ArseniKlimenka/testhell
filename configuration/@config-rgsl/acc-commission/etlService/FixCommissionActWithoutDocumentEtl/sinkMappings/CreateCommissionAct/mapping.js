'use strict';

const { commissionActStatusCodesBack } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = function mapping(input, sinkExchange) {

    const act = sinkExchange.resolveContext('act');
    const products = sinkExchange.resolveContext('products');
    const document = {
        actNo: input.actNo,
        actIssueDate: act.actIssueDate,
        payDate: act.payDate,
        actTypeId: act.actTypeId,
        aaServiceProviderCode: act.aaServiceProviderCode,
        aaServiceProviderName: act.aaServiceProviderName,
        aaNumber: act.aaNumber,
        aaName: act.aaName,
        agentPersonalNumber: act.agentPersonalNumber,
        agentBusinessCode: act.agentBusinessCode,
        periodFrom: act.periodFrom,
        periodTo: act.periodTo,
        reportingPeriodFrom: act.reportingPeriodFrom,
        reportingPeriodTo: act.reportingPeriodTo,
        originalReceiptDate: act.originalReceiptDate,
        notes: act.notes,
        isDocCorrect: act.isDocCorrect,
        products: {
            includedGroup: act.productGroupInclude,
            included: products.filter(_ => _.exclusive === false).map(_ => _.code),
            excludedGroup: act.productGroupExclude,
            excluded: products.filter(_ => _.exclusive === true).map(_ => _.code),
        }
    };

    return {
        number: input.actNo,
        targetState: commissionActStatusCodesBack[act.statusId],
        body: document,
    };
};
