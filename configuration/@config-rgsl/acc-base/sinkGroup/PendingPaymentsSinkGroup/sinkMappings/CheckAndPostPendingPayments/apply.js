'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const postResult = {
        postedIds: sinkResult.PostedIds,
        errorMessage: sinkResult.ErrorMessage,
    };

    sinkExchange.mapContext('postResult', postResult);
};
