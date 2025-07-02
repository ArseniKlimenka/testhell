module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                importDocumentId: input.importDocumentId
            }
        }
    };
};
