'use strict';

module.exports = function mapping(input) {
    const documents = input.bankStatementItems.map(bsi => convertItemToEsDocument(bsi));

    return {
        documents: documents,
    };
};

function convertItemToEsDocument(bsi) {
    const document = {
        id: idToGuid(bsi.bankStatementItemId),
        body: {
            bankStatementItemId: bsi.bankStatementItemId,
            bankStatementItemNo: bsi.bankStatementItemNo,
            importDocumentId: bsi.importDocumentId,
            incomeSourceId: bsi.incomeSourceId,
            incomeSourceName: bsi.incomeSourceName,
            description: bsi.description,
            originalDescription: bsi.originalDescription,
            transactionDate: bsi.transactionDate,
            createDate: bsi.createDate,
            paymentDate: bsi.paymentDate,
            amount: bsi.amount,
            direction: bsi.direction,
            currencyCode: bsi.currencyCode,
            paymentStatusId: bsi.paymentStatusId,
            openAmount: bsi.openAmount,
            isRegistry: bsi.isRegistry,
            isAcquiring: bsi.isAcquiring,
            nonAcceptance: bsi.nonAcceptance,
            toleranceType: bsi.toleranceType,
            rgslGuid: bsi.rgslGuid,
            segment: bsi.segment,
            registryFileFormat: bsi.registryFileFormat,
            registryReferenceNo: bsi.registryReferenceNo,
            debtor: {
                name: bsi.debtorName,
                type: bsi.debtorType,
                accountNo: bsi.debtorAccountNo,
                tin: bsi.debtorTin,
                bic: bsi.debtorBic,
            },
            creditor: {
                name: bsi.creditorName,
                type: bsi.creditorType,
                accountNo: bsi.creditorAccountNo,
                tin: bsi.creditorTin,
                bic: bsi.creditorBic,
            },
            referenceNumbers: bsi.referenceNumbers,
            paymentSourceId: bsi.paymentSourceId,
        },
    };

    return document;
}

function idToGuid(id) {
    const y = (id & 0x3 | 0x8).toString(16);
    const x = id.toString(16).padStart(12, '0');
    return `00000000-0000-4000-${y}000-${x}`;
}
