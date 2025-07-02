'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const actItemPcs = sinkExchange.resolveContext('actItemPcs');

    return {
        actItemPcs: actItemPcs,
    };
};
