'use strict';
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function dataSourceInputMapping(input) {
    return {
        data: {
            criteria: {
                currentDate: dateUtils.dateNow()
            }
        }
    };
};
