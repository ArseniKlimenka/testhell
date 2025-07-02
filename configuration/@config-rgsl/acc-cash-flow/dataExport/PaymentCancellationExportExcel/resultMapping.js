const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input, body) {

    const lines = input.data.map(data => {

        const item = data.resultData;

        const allocations = item.allocations?.map(alc => ({
            allocationId: alc.allocationId,
            cancelled: alc.cancelled ? 'a' : 'r',
            errorMessage: alc.errorMessage ?? '',
        })) ?? [];

        return {
            recordKey: item.recordKey,
            bankStatementItemId: item.bankStatementItemId,
            paymentStatus: translationUtils.getTranslation('dataSource/GetPaymentCancellationAllocationDataSource/1', 'enum', 'paymentStatusComponent', item.paymentStatusId?.toString() ?? '', 'PaymentStatusComponent') ?? '',
            paymentErrorMessage: item.paymentErrorMessage ?? '',
            allocations: allocations,
        };
    });

    const result = {
        lines: lines,
    };

    return result;
};
