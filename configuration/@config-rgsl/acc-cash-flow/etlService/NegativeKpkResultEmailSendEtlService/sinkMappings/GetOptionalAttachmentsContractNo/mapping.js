'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    const bsiId = sinkExchange.bsiId;

    return {
        input: {
            data: {
                criteria: {
                    bsiId: bsiId.toString()
                }
            }
        }
    };
};
