module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                actNo: input.actNo,
            }
        }
    };
};
