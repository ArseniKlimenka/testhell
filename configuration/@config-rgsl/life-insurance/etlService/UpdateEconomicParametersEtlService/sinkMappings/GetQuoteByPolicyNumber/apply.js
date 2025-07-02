'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult.data.length > 0) {

        const quoteResultData = sinkResult.data.filter(i => i.resultData.related.codeName.includes('Quote'));
        const quoteData = quoteResultData[0]?.resultData?.related;
        const quoteNumber = quoteData?.documentNumber;
        const quoteCodeName = quoteData?.codeName;
        const quoteConfigurationVersion = quoteData?.configurationVersion;

        sinkExchange.quote = {
            number: quoteNumber,
            originalConfigurationCodeName: quoteCodeName,
            originalConfigurationVersion: quoteConfigurationVersion,
        };
    }
};
