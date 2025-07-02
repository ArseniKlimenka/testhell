module.exports = function mapping(input) {

    const result = {
        businessNumber: this.businessContext.etlServiceInput.importDocumentNumber
    };

    return result;
};
