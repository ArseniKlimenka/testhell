'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let installements = [];

    if (sinkResult?.data?.length > 0) {

        installements = sinkResult.data.map(d => d.resultData);
    }

    sinkExchange.foundInstallements = installements;
};
