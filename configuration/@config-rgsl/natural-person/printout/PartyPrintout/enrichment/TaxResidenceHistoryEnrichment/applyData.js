'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input, dataSourceResponse) {

    if (!dataSourceResponse.data) {
        return;
    }

    input.taxResidenceHistory = dataSourceResponse.data.map(_ => _.resultData);
    input.taxResidenceHistory.forEach(_ => _.sysUpdatedOn = dateUtils.formatDate(new Date(_.sysUpdatedOn), dateUtils.DateFormats.CALENDAR));
};
