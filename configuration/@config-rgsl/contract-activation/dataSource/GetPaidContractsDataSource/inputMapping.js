module.exports = function DataSourceInputMapping(input) {
    if (input && input.data && input.data.criteria) {
        return {
            parameters: {
                currentStatus: input.data.criteria.currentStatus,
                contractNumbers: input.data.criteria.contractNumbers,
                isCompleted: input.data.criteria.isCompleted,
            }
        };
    }
};
