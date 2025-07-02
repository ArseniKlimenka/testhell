module.exports = function DataSourceInputMapping(input) {

    if (!input?.data?.criteria?.contractNumber) {
        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;
};
