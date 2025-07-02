'use strict';

module.exports = function mapInput(input, sinkExchange) {

    if (sinkExchange.request.holder.partyCode) {

        return {
            input: {
                data: {
                    criteria: {
                        partyCode: sinkExchange.request.holder.partyCode
                    }
                }
            }
        };

    }
    return null;


};
