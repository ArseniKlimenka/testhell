'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    sinkExchange.currentInquiryNumber = input.number;

    return {
        input: {
            data: {
                criteria: {
                    endowmentNumber: input.body.endowmentNumber
                }
            }
        }
    };
};
