'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.partnerShortDescription = sinkResult.data[0].resultData.partnerShortDescription;
    sinkExchange.policyHolderFullName = sinkResult.data[0].resultData.policyHolderFullName;
    sinkExchange.productDescription = sinkResult.data[0].resultData.productDescription;
    sinkExchange.riskPremium = sinkResult.data[0].resultData.riskPremium;
    sinkExchange.insuranceTerms = sinkResult.data[0].resultData.insuranceTerms;
    sinkExchange.currencyDesc = sinkResult.data[0].resultData.currencyDesc;
    sinkExchange.number = sinkResult.data[0].resultData.number;

};
