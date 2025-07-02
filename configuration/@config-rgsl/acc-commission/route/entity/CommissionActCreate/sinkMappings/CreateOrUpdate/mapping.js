const { commissionActStatusCodes } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = function mapping(input, sinkExchange) {

    const body = input.body;

    const act = {
        actNo: input.number,
        issueDate: body.actIssueDate,
        payDate: body.payDate,
        actTypeId: body.actTypeId,
        statusId: commissionActStatusCodes[input.state],
        agentServiceProviderCode: body.aaServiceProviderCode,
        agentAgreementNumber: body.aaNumber,
        productGroupInclude: body.products && body.products.includedGroup,
        productsInclude: body.products && body.products.included,
        productGroupExclude: body.products && body.products.excludedGroup,
        productsExclude: body.products && body.products.excluded,
        periodFrom: body.periodFrom,
        periodTo: body.periodTo,
        originalReceiptDate: body.originalReceiptDate,
        notes: body.notes,
        isDocCorrect: body.isDocCorrect,
        reportingPeriodFrom: body.reportingPeriodFrom,
        reportingPeriodTo: body.reportingPeriodTo,
    };

    return {
        act,
    };
};
