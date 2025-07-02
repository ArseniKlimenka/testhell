module.exports = function DataSourceInputMapping(input) {
    const output = {
        parameters: {
        }
    };

    if (input.data.criteria) {
        output.parameters = { ...input.data.criteria };
    }

    return output;
};
