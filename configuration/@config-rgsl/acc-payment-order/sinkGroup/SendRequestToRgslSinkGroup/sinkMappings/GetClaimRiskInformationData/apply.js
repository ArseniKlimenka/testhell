'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const claimRiskInformationData = getDataSourceResult(sinkResult);
    sinkExchange.mapContext("claimRiskInformationData", claimRiskInformationData);
};

function getDataSourceResult(sinkResult) {

    if (sinkResult?.data?.length !== 1) {

        throw new Error("Claim risk information not found");
    }

    return sinkResult.data[0].resultData;
}
