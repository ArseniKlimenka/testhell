'use strict';

const { getEFRProductsReverseOptional } = require('@config-rgsl/life-insurance/lib/efrHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    return getEFRProductsReverseOptional(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults);

};
