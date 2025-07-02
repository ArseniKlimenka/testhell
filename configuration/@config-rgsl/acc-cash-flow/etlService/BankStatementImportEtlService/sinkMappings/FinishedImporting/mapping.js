module.exports = function mapping(lineInput, sinkExchange) {
    const result = {
        businessNumber: this.businessContext.etlServiceInput.importDocumentNumber
    };

    return result;
};
