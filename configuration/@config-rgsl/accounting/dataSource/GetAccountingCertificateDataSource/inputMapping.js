module.exports = function DataSourceInputMapping(input) {

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    if (input.data.criteria.correctionNumber === 0) {

        output.parameters.correctionNumberZero = true;
    }

    return output;
};
