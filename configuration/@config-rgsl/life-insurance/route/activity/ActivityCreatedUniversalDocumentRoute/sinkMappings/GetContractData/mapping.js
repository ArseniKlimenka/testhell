'use strict';

module.exports = function mapping(input, sinkExchange) {

    const contractNumber = sinkExchange?.universalDocumentBody?.contractNumber ??
        sinkExchange?.universalDocumentBody?.mainAttributes?.contract?.number ??
        sinkExchange?.contractNumber ??
        sinkExchange?.universalDocumentBody?.inquiry?.quoteNumber;

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: contractNumber
                }
            }
        }
    };
};
