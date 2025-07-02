'use strict';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.currentInquiryNumber = input.number;

    return {
        input: {
            data: {
                criteria: {
                    cancellationNumber: input.body.cancellationNumber
                }
            }
        }
    };
};
