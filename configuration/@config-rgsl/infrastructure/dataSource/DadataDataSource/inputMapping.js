module.exports = function DataSourceInputMapping(input) {

    const output = {};

    if (input.data.criteria && input.data.criteria.query) {
        output.query = input.data.criteria.query;
    }

    return output;
};
