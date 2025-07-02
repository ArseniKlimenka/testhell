module.exports = function (input) {
    const output = {
        parameters: {
            importDocumentId: input.data.criteria.importDocumentId
        },
        sort: {
            ROW_NUMBER: 'asc',
        }
    };
    return output;
};
