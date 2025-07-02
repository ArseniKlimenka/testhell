const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input, body) {

    const lines = input.data.map((item) => {

        return {
            "allocationId": item.resultData.allocationId,
            "allocationDate": item.resultData.allocationDate,
            "installmentAmount": item.resultData.installmentAmount,
            "installmentOpenAmount": item.resultData.installmentOpenAmount,
            "installmentStatus": translationUtils.getTranslation('dataSource/AllocationDataSource/1', 'enum', 'installmentStatusComponent', item.resultData.installmentStatus?.toString() ?? '', 'InstallmentStatusComponent') || '',
            "paymentStatusId": translationUtils.getTranslation('dataSource/AllocationDataSource/1', 'enum', 'paymentStatusComponent', item.resultData.bsi.statusId?.toString() ?? '', 'PaymentStatusComponent') || '',
            "transactionDate": item.resultData.bsi.transactionDate,
            "paymentDate": item.resultData.bsi.paymentDate,
            "payAmount": item.resultData.payAmount,
            "docAmount": item.resultData.docAmount,
            "exchangeDifference": item.resultData.exchangeDifference,
            "payCurrencyCode": item.resultData.payCurrencyCode,
            "payerName": item.resultData.bsi.payerName,
            "bsiNo": item.resultData.bsi.bsiNo,
            "bsiDescription": item.resultData.bsi.bescription
        };
    });

    const result = {
        totalInstallmentAmount: input.data.reduce((accumulator, x) => accumulator + x.resultData.installmentAmount, 0),
        totalInstallmentOpenAmount: input.data.reduce((accumulator, x) => accumulator + x.resultData.installmentOpenAmount, 0),
        totalPayAmount: input.data.reduce((accumulator, x) => accumulator + x.resultData.payAmount, 0),
        totalDocAmount: input.data.reduce((accumulator, x) => accumulator + x.resultData.docAmount, 0),
        lines: lines
    };


    return result;
};
