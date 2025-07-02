"use strict";

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.mapContext('createdAmendmentNumber', sinkResult.number);
    sinkExchange.mapContext('createdAmendmentConfigurationCodeName', sinkResult.configurationCodeName);
    sinkExchange.mapContext('createdAmendmentBody', sinkResult.body);
};
