'use strict';

const { getEFRProducts } = require('@config-rgsl/life-insurance/lib/efrHelper');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    const currentDate = DateTimeUtils.dateNow();
    return getEFRProducts(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults, currentDate);

};
