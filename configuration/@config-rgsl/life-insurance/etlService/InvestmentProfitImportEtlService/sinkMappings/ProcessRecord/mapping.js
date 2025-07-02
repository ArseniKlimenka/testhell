'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    const lineData = lineInput.data;

    return {
        request: {
            ImportDocumentId: lineInput.importDocumentId,
            ContractNumber: lineData.contractNumber,
            CalculationDate: lineData.investmentProfitCalculationDate,
            Rate: lineData.investmentProfitRate,
            PaymentTypeCode: lineData.investmentProfitPaymentTypeCode
        }
    };
};
