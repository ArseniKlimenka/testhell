'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    return {
        request: {
            documentNo: input.documentNo,
        }
    };
};
