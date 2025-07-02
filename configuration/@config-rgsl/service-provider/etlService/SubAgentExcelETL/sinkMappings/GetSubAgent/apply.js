'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (!sinkResult.data[0] || !sinkResult.data[0].resultData) { return; }

    sinkExchange.service_provider_code = sinkResult.data[0].resultData.service_provider_code;
    sinkExchange.service_provider_body = sinkResult.data[0].resultData.service_provider_body;
    sinkExchange.party_code = sinkResult.data[0].resultData.party_code;

};
