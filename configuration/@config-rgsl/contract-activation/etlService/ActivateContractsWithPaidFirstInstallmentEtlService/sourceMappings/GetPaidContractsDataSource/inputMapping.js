module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                contractNumbers: input.contractNumbers,
                currentStatus: "Active"
            }
        }
    };
};
