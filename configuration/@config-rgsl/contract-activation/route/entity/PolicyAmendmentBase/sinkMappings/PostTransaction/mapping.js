const guidHelper = require('@config-rgsl/infrastructure/lib/GuidHelper');
const { documentType } = require('@config-rgsl/acc-base/lib/accConsts');
const { transactionTypeId } = require('@config-rgsl/acc-base/lib/attributeConsts');


module.exports = function mapping(item) {
    if (item.state === 'POCreation') {
        const businessEventId = guidHelper.generate();

        const creditRefundPaymentInfo = item.body.paymentAmendmentConditions?.paymentLines?.find(x => x.paymentLineType == 'partialPremiumRefund');

        if (creditRefundPaymentInfo && creditRefundPaymentInfo.paymentLineSum > 0) {
            const journal = createJournal(creditRefundPaymentInfo, item);
            return {
                request: {
                    journals: [journal],
                    businessEventId,
                }
            };
        }
    }
};

function createJournal(creditRefundPaymentInfo, item) {

    const contractNo = item.number;
    const mainContractNo = item.originalDocument.number;
    const applicationSignDate = item.body.basicAmendmentConditions.applicationSignDate;

    const contractVersions = item.body.contractVersions || [];
    const contractStateVersions = contractVersions.filter(i => i.seqNumber == 0 ||
        i.dimensions?.some(d => d.Key === 'amendmentType' && (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));

    const originalContractStateVersion = contractStateVersions.find(i => i.seqNumber == 0);
    const latestContractStateVersion = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber)[0];

    const stateBody = (latestContractStateVersion.seqNumber == 0 ? latestContractStateVersion.body : latestContractStateVersion.snapshotBody) ?? originalContractStateVersion.body;

    const currencyCode = stateBody.basicConditions.currency.currencyCode;


    const requestLines = creditRefundPaymentInfo.paymentLineSumByRisks.map(risk => ({
        contractNumber: contractNo,
        mainContractNumber: mainContractNo,
        amount: -risk.riskSum,
        sourceLineId: risk.riskCode,
        attributes: {
            bankStatementItemId: undefined,
            commissionActId: undefined,
            contractNumber: mainContractNo,
            paymentOrderNumber: undefined,

            isRevaluation: false,
            docCurrencyCode: undefined,
            transactionTypeId: transactionTypeId.InsurancePremiumIncrease,
            documentNo: contractNo,
            commissionRate: undefined,
            dateToCheckPrevPeriod: applicationSignDate,
            useAgentCodes: false,
        },
    }));

    const journal = {
        proposedPostingDate: applicationSignDate,
        currencyCode: currencyCode,
        documentTypeId: documentType.SALES_INVOICE_CANCELLATION_NOT_PAID, // previous value POLICY_CANCELLATION_CREDIT_REPAYMENT
        postingDescription: 'POCreation state',
        documentNo: contractNo,
        lines: requestLines,
    };

    return journal;
}
