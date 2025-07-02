'use strict';

const sendEventConstant = require('@config-rgsl/life-insurance/lib/sendEventConstant');

module.exports = function mapping(sinkInput, sinkExchange) {

    if (sinkInput.subscriber == sendEventConstant.subscriber.SPORTSMAN_CREATE || sinkInput.subscriber == sendEventConstant.subscriber.SPORTSMAN_DELETE) {

        return {
            input: {
                data: {
                    criteria: {
                        subscribers: [sendEventConstant.subscriber.SPORTSMAN_CREATE],
                        documentNumber: sinkInput.documentNumber,
                    }
                }
            }
        };
    }

    return;

};
