module.exports = function mapping(sinkInput, sinkExchange) {
    const guidAlreadyExists = sinkExchange.resolveContext('guidAlreadyExists');
    const skipPayment = sinkExchange.resolveContext('skipPayment');

    if (guidAlreadyExists || skipPayment) {
        return;
    }
    const currencyCode = sinkExchange.resolveContext('currencyCode');

    const item = {
        bankStatementItemNo: sinkInput.no,
        incomeSourceId: sinkInput.incomeSourceId,
        direction: sinkInput.direction,
        referenceNo: sinkInput.referenceNo,
        paymentDescription: sinkInput.paymentDescription,
        currencyCode: currencyCode,
        amount: sinkInput.amount,
        paymentDate: sinkInput.paymentDate,
        transactionDate: sinkInput.transactionDate,
        isRegistry: sinkInput.isRegistry,
        isAcquiring: false,
        nonAcceptance: false,
        toleranceType: sinkInput.tolerance,
        debtorName: sinkInput.debtor.name,
        debtorType: sinkInput.debtor.type,
        debtorBankAccountNo: sinkInput.debtor.bankAccountNo,
        creditorName: 'INSURANCE COMPANY, D.D.',
        creditorType: 'ЮЛ',
        creditorBankAccountNo: 'SI20436266963946784',
        rgslGuid: sinkInput.guid,
        rgslDocumentTypeId: sinkInput.documentTypeId,
        rgslDocumentDate: sinkInput.documentDate,
        paymentSourceId: 1
    };

    return {
        request: {
            items: [ item ],
        },
    };
};
