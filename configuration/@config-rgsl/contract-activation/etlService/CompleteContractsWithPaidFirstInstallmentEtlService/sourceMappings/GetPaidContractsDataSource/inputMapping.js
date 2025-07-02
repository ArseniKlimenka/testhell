module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                currentStatus: "Activated",
                isCompleted: true,
            }
        }
    };
};
