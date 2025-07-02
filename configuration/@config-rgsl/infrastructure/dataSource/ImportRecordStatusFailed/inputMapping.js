module.exports = function (input) {
    const output = {
        parameters: {
            importDocumentId: input.data.criteria.importDocumentId,
            status: 0
        }
    };

    return output;
};
