'use strict';

module.exports = function fetchMapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    activityId: input.activityId,
                    noCriteria: true,
                }
            }
        }
    };
};
