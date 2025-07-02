const { bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function resultMapping(input) {
    const notAllocatableStatuses = [
        bankStatementItemStatusId.CANCELLED,
        bankStatementItemStatusId.ALLOCATED_TO_REGISTRY,
    ];

    return {
        bankStatementItemId: input.bankStatementItemId,
        importDocumentId: input.importDocumentId,
        bankStatementItemNo: input.bankStatementItemNo,
        incomeSourceId: input.incomeSourceId,
        incomeSourceName: input.incomeSourceName,
        description: input.description,
        originalDescription: input.originalDescription,
        transactionDate: input.transactionDate,
        amount: input.amount,
        direction: input.direction,
        currencyCode: input.currencyCode,
        paymentStatusId: input.paymentStatusId,
        openAmount: notAllocatableStatuses.includes(input.paymentStatusId) ? 0 : input.openAmount,
        hasRefunds: input.hasRefunds,
        isRegistry: input.isRegistry,
        isAcquiring: input.isAcquiring,
        createDate: input.createDate,
        paymentDate: input.paymentDate,
        nonAcceptance: input.nonAcceptance,
        toleranceType: input.toleranceType,
        debtorName: input.debtor.name,
        debtorType: input.debtor.type,
        debtorAccountNo: input.debtor.accountNo,
        debtorTin: input.debtor.tin,
        debtorBic: input.debtor.bic,
        creditorName: input.creditor.name,
        creditorType: input.creditor.type,
        creditorAccountNo: input.creditor.accountNo,
        creditorTin: input.creditor.tin,
        creditorBic: input.creditor.bic,
        referenceNumbers: input.referenceNumbers,
        rgslGuid: input.rgslGuid,
        segment: input.segment,
        registryFileFormat: input.registryFileFormat,
        paymentSourceId: input.paymentSourceId,
    };
};
