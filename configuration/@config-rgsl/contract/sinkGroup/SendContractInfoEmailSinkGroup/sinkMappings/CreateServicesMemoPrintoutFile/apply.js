'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const fileIds = sinkResult.printoutIds;

    if (!fileIds || fileIds.length == 0) {

        throw "Unable to create services memo printouts!";
    }

    sinkExchange.mapContext('servicesMemoAttachmentFileIds', fileIds);
};
