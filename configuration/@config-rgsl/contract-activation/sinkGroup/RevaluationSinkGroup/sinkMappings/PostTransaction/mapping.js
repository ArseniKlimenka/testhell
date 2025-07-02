const guidHelper = require('@config-rgsl/infrastructure/lib/GuidHelper');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { journalTypeIds, documentType, businessEventTypeIds } = require('@config-rgsl/acc-base/lib/accConsts');
const { transactionTypeId } = require('@config-rgsl/acc-base/lib/attributeConsts');
const { reduceGroupBy, compareByObjectProperties } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(input, sinkExchange) {
    const result = sinkExchange.resolveContext('result');
    if (!result) {
        return;
    }

    let lines = result.map(_ => ({
        contractNumber: _.contractNumber,
        docCurrencyCode: _.currencyCode,
        mainContractNumber: _.contractNumber,
        sourceLineId: _.itemNo,
        amount: _.revaluationAmount,
        isRevaluation: true,
        transactionTypeId: transactionTypeId.Revaluation,
        documentNo: _.contractNumber,
    }));

    const fields = [
        'contractNumber',
        'mainContractNumber',
        'documentNo',
        'docCurrencyCode',
        'sourceLineId',
        'isRevaluation',
        'transactionTypeId',
    ];
    lines = reduceGroupBy(lines, fields, undefined, (p, c) => ({ amount: round(p.amount + c.amount, 2) }), { amount: 0 });
    lines = lines.filter(_ => _.amount !== 0);
    if (lines.length === 0) {
        return;
    }

    lines.sort(compareByObjectProperties(fields));

    const contracts = reduceGroupBy(lines, ['mainContractNumber'], 'lines');
    const businessEventId = input.businessEventId ?? guidHelper.generate();
    const journals = contracts.map(_ => ({
        journalTypeId: journalTypeIds.REVALUATION,
        proposedPostingDate: input.newRevaluationDate,
        currencyCode: currency.localCurrency,
        businessEventTypeId: businessEventTypeIds.REVALUATION,
        documentTypeId: documentType.REVALUATION_PREMIUM,
        postingDescription: input.postingDescription,
        documentNo: _.mainContractNumber,
        lines: _.lines.map(item => ({
            contractNumber: item.contractNumber,
            mainContractNumber: item.mainContractNumber,
            amount: item.amount,
            sourceLineId: item.sourceLineId,
            attributes: {
                bankStatementItemId: undefined,
                commissionActId: undefined,
                contractNumber: item.contractNumber,
                paymentOrderNumber: undefined,

                isRevaluation: item.isRevaluation,
                transactionTypeId: item.transactionTypeId,
                docCurrencyCode: item.docCurrencyCode,
                documentNo: item.documentNo,
                commissionRate: undefined,
                dateToCheckPrevPeriod: undefined,
                useAgentCodes: false,
            }
        })),
    }));

    return {
        request: {
            journals,
            businessEventId,
        }
    };
};
