'use strict';

module.exports = function fetch(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    actId: input.actId,
                }
            }
        }
    };
};
