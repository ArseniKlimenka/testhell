const guidHelper = require('@config-rgsl/infrastructure/lib/GuidHelper');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { documentType } = require('@config-rgsl/acc-base/lib/accConsts');
const { transactionTypeId } = require('@config-rgsl/acc-base/lib/attributeConsts');
const { reduceGroupBy, compareByObjectProperties } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(input, sinkExchange) {
    const result = sinkExchange.resolveContext('result');
    if (!result) {
        return;
    }

    const loadDate = sinkExchange.resolveContext('loadDate');
    let lines = result.map(_ => ({
        contractNumber: _.contractNumber,
        docCurrencyCode: _.currencyCode,
        mainContractNumber: _.contractNumber,
        sourceLineId: _.itemNo,
        amount: _.revaluationAmount,
        documentNo: _.contractNumber,
    }));

    const fields = [
        'contractNumber',
        'mainContractNumber',
        'documentNo',
        'docCurrencyCode',
        'sourceLineId',
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
        proposedPostingDate: loadDate,
        currencyCode: currency.localCurrency,
        documentTypeId: documentType.REVALUATION_IC,
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

                isRevaluation: true,
                transactionTypeId: transactionTypeId.Revaluation,
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
