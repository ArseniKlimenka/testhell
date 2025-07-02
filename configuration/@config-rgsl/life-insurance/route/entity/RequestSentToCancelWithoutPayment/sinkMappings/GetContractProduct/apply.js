'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult &&
        sinkResult.data &&
        sinkResult.data[0] &&
        sinkResult.data[0].resultData &&
        sinkResult.data[0].resultData.body)
    {
        const body = sinkResult.data[0].resultData.body;
        sinkExchange.productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    }

};
