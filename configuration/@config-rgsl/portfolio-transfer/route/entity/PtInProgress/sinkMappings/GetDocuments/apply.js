'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let contractNumbers = sinkResult.data.map(_ => _.resultData.referenceNo);
    contractNumbers = [...new Set(contractNumbers)];
    sinkExchange.mapContext('contractNumbers', contractNumbers);
};
