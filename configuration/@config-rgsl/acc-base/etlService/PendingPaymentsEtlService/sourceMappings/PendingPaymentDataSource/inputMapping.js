module.exports = function mapSinkToDataSource(input) {
    return {
        data: {
            criteria: {
                documentNumbers: input.documentNumbers,
            }
        }
    };
};
