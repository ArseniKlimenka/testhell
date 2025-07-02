'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const result = {
        businessNumber: this.businessContext.etlServiceInput.importDocumentNumber
    };

    return result;
};
