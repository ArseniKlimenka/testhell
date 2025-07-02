'use strict';


module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (!sinkResult.data || sinkResult.data.length === 0) {

        return;
    }

    const strategyData = sinkResult.data.map(x => x.resultData);
    const products = sinkExchange?.result?.data?.products;

    for (const product of products) {
        const rows = strategyData.filter(x => x.productCode === product.productCode && product.productType === 'investment');
        product.investmentStrategyCode = rows?.length > 0 ? [... new Set(rows.map(x => x.strategyCode))] : null;
    }
};
