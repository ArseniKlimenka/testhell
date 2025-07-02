"use strict";

module.exports = function mapping(input, dataSource) {

    if ((dataSource?.data?.length ?? 0) === 0) {

        return;
    }

    if (!input.technicalData) {

        input.technicalData = {};
    }

    const paymentInfo = dataSource.data.map(item => {

        return {
            paymentStatusId: item.resultData.paymentStatusId,
            transactionDate: item.resultData.transactionDate,
            paymentDate: item.resultData.paymentDate,
            payAmount: item.resultData.payAmount,
            payRate: item.resultData.payRate,
            docAmount: item.resultData.docAmount,
            exchangeDifference: item.resultData.exchangeDifference,
            payCurrencyCode: item.resultData.payCurrencyCode,
            toleranceOverpayment: item.resultData.toleranceOverpayment,
            toleranceUnderpayment: item.resultData.toleranceUnderpayment,
            payerName: item.resultData.payerName,
            fake: item.resultData.fake,
            bsiNo: item.resultData.bsiNo,
            localCurrencyExchangeRate: item.resultData.localCurrencyExchangeRate,
            cbRate: item.resultData.cbRate
        };
    });

    input.technicalData.policyPaymentInfo = paymentInfo;
};
