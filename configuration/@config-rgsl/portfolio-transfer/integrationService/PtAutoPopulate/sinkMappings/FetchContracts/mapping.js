'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const sadNumber = sinkInput.sadNumberFrom;
    const aaNumberFrom = sinkInput.aaNumberFrom;
    const contractNumber = sinkInput.contractNumber;
    const ptNumber = sinkInput.ptNumber;

    const request = {
        input: {
            data: {
                criteria: {
                    contractNumber,
                    aaNumberFrom,
                    sadNumber,
                    ptNumber,
                }
            }
        }
    };

    return request;
};
