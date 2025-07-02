module.exports = function DataSourceInputMapping(input) {
    if (!input?.data?.criteria?.productCode) {
        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;
};
