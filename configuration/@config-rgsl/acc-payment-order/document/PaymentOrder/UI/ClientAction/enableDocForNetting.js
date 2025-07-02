'use strict';

module.exports = function enableDocForNetting(input, ambientProperties) {

    return !input.data.isFutureContract;
};
