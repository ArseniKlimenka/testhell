'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    return {
        id: input.id,
        number: input.number,
        body: input.body,
    };
};
