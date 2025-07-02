module.exports = function DataSourceInputMapping(input) {
    const criteria = input.data.criteria;

    const output = {
        parameters: {
            ...criteria,
        }
    };

    return output;
};
