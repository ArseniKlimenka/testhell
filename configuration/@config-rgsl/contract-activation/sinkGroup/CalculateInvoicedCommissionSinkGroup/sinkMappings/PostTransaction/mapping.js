const guidHelper = require('@config-rgsl/infrastructure/lib/GuidHelper');
const { documentType } = require('@config-rgsl/acc-base/lib/accConsts');
const { transactionTypeId } = require('@config-rgsl/acc-base/lib/attributeConsts');
const { reduceGroupBy, compareByObjectProperties } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function mapping(input, sinkExchange) {
    const invoicedCommissions = sinkExchange.resolveContext('invoicedItems');

    if (invoicedCommissions.length === 0) {
        return;
    }

    const fields = [
        'contractNumber',
        'postingDate',
        'objectCode',
        'itemNo',
        'currencyCode',
        'periodNumber',
        'aaCommRate',
        'docCommRate',
        'isCancellationTransaction',
        'amendmentNumber',
        'cancellationPostDate',
    ];
    let lines = reduceGroupBy(invoicedCommissions, fields, undefined,
        (p, c) => {
            return {
                calcCommAmount: p.calcCommAmount + c.calcCommAmount,
                baseAmount: p.baseAmount + c.baseAmount,
            };
        },
        {
            calcCommAmount: 0,
            baseAmount: 0,
        });
    lines = lines.filter(_ => _.calcCommAmount !== 0);

    // return journals;
    if (lines.length === 0) {
        return;
    }

    lines.sort(compareByObjectProperties(fields));

    const businessEventId = input.businessEventId ?? guidHelper.generate();
    const journals = lines.map(invComm => createJournal(invComm));

    return {
        request: {
            journals,
            businessEventId,
        }
    };
};

function createJournal(invoicedCommission) {

    const contractNumber = invoicedCommission.amendmentNumber ?? invoicedCommission.contractNumber;
    const mainContractNumber = invoicedCommission.contractNumber;

    const journal = {
        proposedPostingDate: invoicedCommission.isCancellationTransaction ? (invoicedCommission.cancellationPostDate ?? invoicedCommission.postingDate) : invoicedCommission.postingDate,
        currencyCode: invoicedCommission.currencyCode,
        documentTypeId: invoicedCommission.isCancellationTransaction ? documentType.INVOICED_COMMISSION_CANCELLATION : documentType.INVOICED_COMMISSION,
        postingDescription: invoicedCommission.itemNo + ':' + invoicedCommission.postingDate,
        documentNo: contractNumber,
        lines: [{
            contractNumber: contractNumber,
            mainContractNumber: mainContractNumber,
            amount: invoicedCommission.calcCommAmount,
            sourceLineId: invoicedCommission.itemNo,
            attributes: {
                bankStatementItemId: undefined,
                commissionActId: undefined,
                contractNumber: contractNumber,
                paymentOrderNumber: undefined,

                isRevaluation: false,
                docCurrencyCode: undefined,
                transactionTypeId: transactionTypeId.InvoicedComission,
                documentNo: contractNumber,
                commissionRate: invoicedCommission.aaCommRate,
                dateToCheckPrevPeriod: invoicedCommission.isCancellationTransaction ? invoicedCommission.postingDate : undefined,
                useAgentCodes: true,
            },
        }],
    };

    return journal;
}
