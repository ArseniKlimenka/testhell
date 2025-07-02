'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.universalDocumentBody = sinkResult.data[0].resultData.body;
    sinkExchange.universalDocumentConfigurationName = sinkResult.data[0].resultData.configurationName;

};
