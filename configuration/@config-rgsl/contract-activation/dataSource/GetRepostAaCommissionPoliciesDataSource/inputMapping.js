module.exports = function DataSourceInputMapping(input) {
    if (!input || !input.data || !input.data.criteria) {
        throw "Invalid input parameters!";
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;
};
