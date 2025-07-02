module.exports = function DataSourceInputMapping(input) {

    if (!input || !input.data || !input.data.criteria) {

        throw 'Input criteria was not defined!';
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;
};
