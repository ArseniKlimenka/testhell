module.exports = function inputMapping(input) {
    return {
        data: {
            criteria: {
                importDocumentId: input.data.criteria.importDocumentId,
            }
        }
    };
};
