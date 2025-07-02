'use strict';

module.exports = function mapInput(input, sinkExchange) {

    if (sinkExchange.request.id) {

        return {
            input: {
                data: {
                    criteria: {
                        entityId: sinkExchange.request.id
                    }
                }
            }
        };

    }
    return null;


};
