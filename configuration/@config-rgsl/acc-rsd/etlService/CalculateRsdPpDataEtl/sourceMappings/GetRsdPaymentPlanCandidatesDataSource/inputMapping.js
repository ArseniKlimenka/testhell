module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                from: input.from,
                to: input.executionDate,
                contractNumber: input.contractNumber,
            }
        }
    };
};
