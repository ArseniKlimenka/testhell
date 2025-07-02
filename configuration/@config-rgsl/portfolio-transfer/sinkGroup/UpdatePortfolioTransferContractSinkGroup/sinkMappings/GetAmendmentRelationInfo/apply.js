'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const relationInfos = sinkResult.data.map(_ => _.resultData);
    if (relationInfos.length !== 1) {
        throw 'Relation info was not found: ' + relationInfos.length;
    }

    const relationInfo = relationInfos[0];

    if (!['Draft', 'Active', 'Activated'].includes(relationInfo.mainStateCode)) {
        throw 'Main contract has an incorrect state!';
    }

    if (relationInfo.amendmentStateCode && relationInfo.amendmentStateCode !== 'Activated') {
        throw 'Amendment has an incorrect state!';
    }

    sinkExchange.mapContext('relationInfo', relationInfos[0]);
};
