const { bankStatementItemSourceId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function mapping(sinkInput, sinkExchange) {
    const items = sinkInput.data.items;

    const resultItems = items.map(item => {
        return {
            ImportDocumentId: sinkInput.importDocumentId,
            BankStatementItemNo: item.bankStatementItemNo,
            IncomeSourceId: item.incomeSourceId,
            Direction: item.direction,
            PaymentDescription: item.paymentDescription,
            OriginalPaymentDescription: item.originalPaymentDescription,
            CurrencyCode: item.currencyCode,
            Amount: item.amount,
            PaymentDate: item.paymentDate,
            TransactionDate: item.transactionDate,
            IsRegistry: item.isRegistry,
            IsAcquiring: item.isAcquiring,
            NonAcceptance: item.nonAcceptance,
            ToleranceType: item.toleranceType,
            DebtorName: item.debtor.name,
            DebtorType: item.debtor.type,
            DebtorBankAccountNo: item.debtor.bankAccountNo,
            CreditorName: item.creditor.name,
            CreditorType: item.creditor.type,
            CreditorBankAccountNo: item.creditor.bankAccountNo,
            PaymentSourceId: item.paymentSourceId,
            Fake: item.paymentSourceId === bankStatementItemSourceId.PAYMENT_ORDER,
            IsMigrated: item.isMigrated,
            RgslGuid: item.rgslGuid,
            RgslDocumentTypeId: item.rgslDocumentTypeId,
        };
    });

    return {
        request: {
            Items: resultItems,
        }
    };
};
