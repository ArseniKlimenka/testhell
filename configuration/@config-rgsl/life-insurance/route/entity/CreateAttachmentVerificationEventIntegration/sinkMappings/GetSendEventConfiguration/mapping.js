'use strict';

const constants = require('@config-rgsl/life-insurance/lib/sendEventConstant');

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    eventType: constants.eventType.ModifyDocsStatus
                }
            }
        }
    };

};
