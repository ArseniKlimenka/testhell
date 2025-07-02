'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data && sinkResult.data.length && sinkResult.data.length > 0) {

        sinkExchange.requestAttachmentsWithFileId = sinkResult.data.map(item => item.resultData);

    }
};
