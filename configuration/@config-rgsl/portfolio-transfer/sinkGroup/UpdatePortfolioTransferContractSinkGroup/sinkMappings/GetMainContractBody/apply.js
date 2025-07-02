'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const contractInfos = sinkResult.data.map(_ => _.resultData);
    if (contractInfos.length !== 1) {
        throw 'Contract info was not found: ' + contractInfos.length;
    }

    const contractInfo = contractInfos[0];

    sinkExchange.mapContext('contractInfo', contractInfo);
};
