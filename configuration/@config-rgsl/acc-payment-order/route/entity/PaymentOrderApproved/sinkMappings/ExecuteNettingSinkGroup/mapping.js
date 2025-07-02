'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    return {
        paymentOrderNumber: input.number,
    };
};
