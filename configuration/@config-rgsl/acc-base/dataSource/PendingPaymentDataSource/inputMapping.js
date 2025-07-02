module.exports = function DataSourceInputMapping(input) {
    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;
};
