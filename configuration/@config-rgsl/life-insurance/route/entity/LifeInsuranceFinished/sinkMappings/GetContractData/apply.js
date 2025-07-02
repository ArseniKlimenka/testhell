const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult?.data?.length > 0) {
        sinkExchange.contractData = sinkResult.data[0].resultData;
    }
};
