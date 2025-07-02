'use strict';

module.exports = function mapping(input, sinkExchange) {
    const ptNumber = this.businessContext.etlServiceInput.portfolioTransferNumber;

    return {
        input: {
            data: {
                criteria: {
                    documentNo: ptNumber,
                    notInStateCodes: ['Allocated'],
                }
            }
        }
    };
};
