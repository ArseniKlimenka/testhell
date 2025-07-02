module.exports = function mapping(lineInput, sinkExchange) {

    if (this.businessContext.etlServiceInput.skipStatusSwitch) {
        return;
    }

    const result = {
        businessNumber: this.businessContext.etlServiceInput.rsdNumber,
    };

    return result;
};
