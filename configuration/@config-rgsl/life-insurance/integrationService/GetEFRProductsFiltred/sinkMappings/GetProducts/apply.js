'use strict';

const { getEFRProductsFiltred } = require('@config-rgsl/life-insurance/lib/efrHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    return getEFRProductsFiltred(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults);

};
