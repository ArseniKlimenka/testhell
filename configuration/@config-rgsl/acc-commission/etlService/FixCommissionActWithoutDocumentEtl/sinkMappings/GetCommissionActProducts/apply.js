'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const products = sinkResult.data.map(_ => _.resultData);
    sinkExchange.mapContext('products', products);
};
