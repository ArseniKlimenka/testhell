'use strict';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.serviceInput = input;

    const output = {
        input: {
            data: {
                criteria: {
                }
            }
        }
    };

    return output;
};
