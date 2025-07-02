'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = input.body;
    const number = input.number;

    const result = {
        body: body,
        number: number
    };

    return result;
};
