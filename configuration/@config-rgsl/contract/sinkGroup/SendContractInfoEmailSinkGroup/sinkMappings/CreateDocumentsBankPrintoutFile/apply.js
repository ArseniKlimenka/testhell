'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const fileIds = sinkResult.printoutIds;

    if (!fileIds || fileIds.length == 0) {

        throw "Unable to create other documents printouts!";
    }

    sinkExchange.mapContext('DocumentsBankAttachmentFileIds', fileIds);
};
