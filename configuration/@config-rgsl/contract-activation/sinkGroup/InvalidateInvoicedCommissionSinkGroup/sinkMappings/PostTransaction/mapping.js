const guidHelper = require('@config-rgsl/infrastructure/lib/GuidHelper');
const { documentType, businessEventTypeIds } = require('@config-rgsl/acc-base/lib/accConsts');
const { transactionTypeId } = require('@config-rgsl/acc-base/lib/attributeConsts');
const { compareByObjectProperties } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function mapping(input, sinkExchange) {
    const act = sinkExchange.resolveContext('act');
    const actItems = sinkExchange.resolveContext('actItems');
    const policyInfos = sinkExchange.resolveContext('policyInfos');
    const paymentPlan = sinkExchange.resolveContext('paymentPlan');

    const fields = [
        'referenceNo',
        'sourceLineId',
        'invCommLcAmount',
    ];
    const journals = [];

    actItems.sort(compareByObjectProperties(fields));

    const businessEventId = input.businessEventId ?? guidHelper.generate();

    for (const actItem of actItems) {

        if (!actItem.invCommLcAmount || actItem.invCommLcAmount === 0) {
            continue;
        }

        const policyInfo = policyInfos.find(_ => _.contractNumber === actItem.referenceNo);
        const ppItem = paymentPlan.find(_ => _.contractNumber === actItem.referenceNo && _.dueDate === actItem.dueDate);

        const journal = createJournal(act, actItem, policyInfo, ppItem, input.sign);
        journals.push(journal);
    }

    return {
        request: {
            journals,
            businessEventId,
        }
    };
};

function createJournal(act, actItem, policyInfo, ppItem, sign) {
    const requestLines = [{
        contractNumber: policyInfo.contractNumber,
        mainContractNumber: policyInfo.mainContractNumber,
        amount: actItem.invCommDocAmount * sign,
        sourceLineId: actItem.sourceLineId,
        attributes: {
            bankStatementItemId: undefined,
            commissionActId: act.actId,
            contractNumber: policyInfo.contractNumber,
            paymentOrderNumber: undefined,

            isRevaluation: false,
            docCurrencyCode: undefined,
            transactionTypeId: transactionTypeId.InvoicedComission,
            documentNo: actItem.referenceNo,
            commissionRate: actItem.docCommRate ?? actItem.aaCommRate,
            dateToCheckPrevPeriod: undefined,
            useAgentCodes: true,
        },
    }];

    const request = {
        proposedPostingDate: ppItem.postingDate,
        currencyCode: policyInfo.currencyCode,
        businessEventTypeId: businessEventTypeIds.COMMISSION_POSTING,
        documentTypeId: documentType.INVOICED_COMMISSION,
        postingDescription: 'act invalidation',
        documentNo: act.actNo,
        lines: requestLines,
    };

    return request;
}
