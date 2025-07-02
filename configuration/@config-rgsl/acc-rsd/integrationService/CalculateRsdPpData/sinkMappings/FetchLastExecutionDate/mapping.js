'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkInput, sinkExchange) {
    const dateNow = sinkInput.executionDate ?? dateUtils.dateNow();
    sinkExchange.mapContext('dateNow', dateNow);

    return {
        input: {
            data: {
                criteria: {

                }
            }
        }
    };
};
