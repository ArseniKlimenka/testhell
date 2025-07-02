module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                rgslGuid: input.rgslGuid,
            }
        }
    };
};
