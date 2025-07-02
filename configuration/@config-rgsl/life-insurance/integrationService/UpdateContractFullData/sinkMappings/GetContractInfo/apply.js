'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (!sinkResult?.ContractNumber) {

        throw 'Указанный договор не найден!';
    }

    sinkExchange.mapContext('contractData', sinkResult);
};
