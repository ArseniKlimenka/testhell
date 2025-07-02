const {
    bankStatementDirection,
    bankStatementItemToleranceType,
    bankStatementItemSourceId,
} = require('@config-rgsl/acc-base/lib/bankStatementEnums');

module.exports = function mapping(sinkInput, sinkExchange) {

    const rsdNumber = this.businessContext.etlServiceInput.rsdNumber;
    const transactionDate = this.businessContext.etlServiceInput.transactionDate;
    const contractNumber = sinkInput.contractNumber;
    const rsdAmount = sinkInput.rsdAmount;

    if (rsdAmount === 0) {
        return;
    }

    const result = {
        bankStatementItemNo: rsdNumber + ' - ' + contractNumber,
        incomeSourceId: 0,
        direction: bankStatementDirection.INCOMING,
        referenceNo: contractNumber,
        paymentDescription: `Формирование РСД: ${rsdNumber} Документ: ${contractNumber}`,
        currencyCode: sinkInput.currencyCode,
        amount: rsdAmount,
        paymentDate: transactionDate,
        transactionDate: transactionDate,
        isRegistry: false,
        isAcquiring: false,
        nonAcceptance: false,
        toleranceType: bankStatementItemToleranceType.STANDARD,
        debtorName: undefined,
        creditorName: undefined,
        paymentSourceId: bankStatementItemSourceId.RSD,
        fake: true,
        isMigrated: false,
    };

    return {
        request: {
            items: [result],
        }
    };
};
