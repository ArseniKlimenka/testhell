module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                paymentCancellationId: input.paymentCancellationId,
            },
            sort: [
                {
                    fieldName: 'allocationId',
                    descending: true,
                },
            ]
        }
    };
};
