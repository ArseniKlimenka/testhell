'use strict';

module.exports = function mapping(sinkResult) {

    return {
        paymentOrders: sinkResult.sinkExchange.paymentOrders
    };
};
