module.exports = function mapping(input) {
    return {
        data: {
            criteria: {
                bankStatementItemIds: input.bankStatementItemIds,
                skipLocked: true,
                createdDateFrom: input.IntervalStart,
                createdDateTo: input.IntervalEnd,
            }
        }
    };
};
