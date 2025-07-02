'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    productCodes: sinkExchange.productCodes,
                    issueDate: dateUtils.dateNow()
                }
            }
        }
    };
};
