const { compareByObjectProperties } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const guidHelper = require('@config-rgsl/infrastructure/lib/GuidHelper');
const { documentType, journalTypes } = require('@config-rgsl/acc-base/lib/accConsts');
const { transactionTypeId, personTypeId } = require('@config-rgsl/acc-base/lib/attributeConsts');
const { paymentOrderType, paymentOrderSubType, paymentLineType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const businessEventId = guidHelper.generate();
    sinkExchange.mapContext('businessEventId', businessEventId);
    const journals = [];

    const body = input.body;
    const type = body.paymentOrderInformation.paymentOrderType;
    const subType = body.paymentOrderInformation.paymentOrderSubType;
    const items = body.paymentOrderItems;
    items?.sort(compareByObjectProperties(['itemType', 'paymentCurrencyAmount']));

    if (type === paymentOrderType.Claim) {

        const claim = sinkExchange.resolveContext('claimBody') ?? sinkExchange.resolveContext('endowmentBody');

        for (const item of items) {
            let documentTypeId;
            switch (item.itemType) {
                case paymentLineType.riskPayment:
                    documentTypeId = documentType.CLAIM;
                    break;
                case paymentLineType.surrenderValue:
                    documentTypeId = documentType.PAYMENT_ORDER_POLICY_CANCELLATION;
                    break;
                case paymentLineType.investProfit:
                    documentTypeId = documentType.PAYMENT_ORDER_INVEST_PROFIT;
                    break;
                case paymentLineType.PIT:
                    documentTypeId = documentType.PAYMENT_ORDER_POLICY_CANCELLATION_PIT;
                    break;
                default:
                    continue;
            }

            const journal = createRequest(
                input.number,
                body.paymentOrderInformation.referenceNumber,
                body.paymentOrderInformation.paymentOrderDate,
                body.paymentOrderAmounts.paymentCurrencyCode,
                item.paymentCurrencyAmount,
                claim.mainAttributes.selectedRisk.riskCode,
                documentTypeId,
                claim.mainAttributes.contract.number,
                claim.mainAttributes.contract.number,
                claim.mainAttributes.applicationInfo.statementApplicationDate);
            journals.push(journal);
        }
    }
    else if (type === paymentOrderType.PolicyCancellation && subType != paymentOrderSubType.PIT) {
        for (const item of items) {
            let documentTypeId;
            switch (item.itemType) {
                case paymentLineType.riskPayment:
                    documentTypeId = documentType.CLAIM;
                    break;
                case paymentLineType.surrenderValue:
                    documentTypeId = documentType.PAYMENT_ORDER_POLICY_CANCELLATION;
                    break;
                case paymentLineType.investProfit:
                    documentTypeId = documentType.PAYMENT_ORDER_INVEST_PROFIT;
                    break;
                case paymentLineType.PIT:
                    documentTypeId = documentType.PAYMENT_ORDER_POLICY_CANCELLATION_PIT;
                    break;
                default:
                    continue;
            }

            const mainRisks = sinkExchange.resolveContext('mainRisks');
            const mainRisk = mainRisks.find(r => r.contractNumber == input.body.paymentOrderInformation.contractNumber);

            const journal = createRequest(
                input.number,
                body.paymentOrderInformation.referenceNumber,
                body.paymentOrderInformation.paymentOrderDate,
                body.paymentOrderAmounts.paymentCurrencyCode,
                item.paymentCurrencyAmount,
                mainRisk.mainRiskCode,
                documentTypeId,
                body.paymentOrderInformation.contractAmendmentNumber,
                body.paymentOrderInformation.contractNumber,
                undefined);
            journals.push(journal);
        }
    }

    return {
        request: {
            journals,
            businessEventId,
        }
    };
};

function createRequest(paymentOrderNumber, documentNo, postingDate, currencyCode, amount, sourceLineId, refDocumentType, contractNo, mainContractNo, dateToCheckPrevPeriod) {

    const journal = {
        // journalTypeId: journalTypes.PAYMENT_ORDER,
        proposedPostingDate: postingDate,
        currencyCode: currencyCode,
        // businessEventTypeId: businessEventTypes.STATEMENT_ITEM_ALLOCATION.businesEventTypeId,
        documentTypeId: refDocumentType,
        postingDescription: 'PaymentOrder line ' + refDocumentType,
        documentNo: paymentOrderNumber,
        lines: [{
            contractNumber: contractNo,
            mainContractNumber: mainContractNo,
            amount: amount,
            sourceLineId: sourceLineId,
            attributes: {
                bankStatementItemId: undefined,
                commissionActId: undefined,
                contractNumber: mainContractNo,
                paymentOrderNumber: paymentOrderNumber,

                isRevaluation: false,
                docCurrencyCode: undefined,
                transactionTypeId: transactionTypeId.PaymentOrder,
                documentNo: documentNo,
                commissionRate: undefined,
                dateToCheckPrevPeriod: dateToCheckPrevPeriod,
                useAgentCodes: false,
            },
        }],
    };

    return journal;
}
