'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    originDocumentNumber: sinkExchange.amendmentNumber,
                    calculationDate: sinkInput.calculationDate,
                    calculationContext: sinkInput.calculationContext
                }
            }
        }
    };
};
