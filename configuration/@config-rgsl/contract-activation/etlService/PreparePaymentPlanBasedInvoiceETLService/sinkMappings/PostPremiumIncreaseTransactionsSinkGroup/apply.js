'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let affectedContracts = sinkExchange.resolveContext('affectedContracts');
    if (!affectedContracts) {
        affectedContracts = [];
        sinkExchange.mapContext('affectedContracts', affectedContracts);
    }
    affectedContracts.push(...sinkResult.affectedContracts);
};
