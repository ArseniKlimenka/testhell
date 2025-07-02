'use strict';

module.exports = function enableDocForNettingText(input, ambientProperties) {

    return !!input.data.isFutureContract;
};
