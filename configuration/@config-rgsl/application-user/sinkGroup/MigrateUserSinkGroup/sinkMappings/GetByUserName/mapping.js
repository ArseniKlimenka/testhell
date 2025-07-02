'use strict';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.mapContext('password', input.password);

    return {
        username: input.username,
        throwIfNotFound: true,
    };
};
