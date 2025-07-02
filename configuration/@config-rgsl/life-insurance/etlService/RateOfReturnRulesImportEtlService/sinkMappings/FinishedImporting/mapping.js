'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    const errorCount = sinkExchange.globalContext?.counters?.errorCount;

    if (errorCount > 0) {
        return;
    }

    const result = {
        businessNumber: this.businessContext.etlServiceInput.importDocumentNumber
    };

    return result;
};
