'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    return {
        username: lineInput.data.sadNumber,
        throwIfNotFound: true
    };
};
