module.exports = function (input) {
    const output = {
        parameters: {
            importDocumentId: input.data.criteria.importDocumentId
        }
    };
    return output;
};
