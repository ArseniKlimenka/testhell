'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult.data.length === 0) {

        throw "Агентский договор не найден!";
    }

    const aaData = sinkResult.data[0];

    const convertedAaData = {
        id: aaData.resultData.id,
        number: aaData.resultData.documentCode,
        manualNumber: aaData.resultData.manualNumber,
        externalNumber: aaData.resultData.externalNumber,
        isTechnical: aaData.resultData.isTechnical,
        formatedNumber: `${aaData.resultData.manualNumber ?? aaData.resultData.documentCode}/${aaData.resultData.externalNumber}`,
    };

    sinkExchange.mapContext('aaData', convertedAaData);
};
