module.exports = function dataSourceInputMapping(input) {

    if (input.onlyAllocation === true) {
        return;
    }

    return {
        data: {
            criteria: {
                paymentCancellationId: input.paymentCancellationId,
                notCancelled: true,
                hasNoActiveAllocation: true,
            }
        }
    };
};
