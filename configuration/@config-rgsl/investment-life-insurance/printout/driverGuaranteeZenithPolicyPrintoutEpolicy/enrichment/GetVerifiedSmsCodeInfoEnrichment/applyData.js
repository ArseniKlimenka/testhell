'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {
        input.securityCode = dataSourceResponse.data[0].resultData.securityCode;
        input.notificationDate = dataSourceResponse.data[0].resultData.notificationDate;
        input.notificationDateOut = dateHelper.formatDate(input.notificationDate, dateHelper.DateFormats.CALENDAR_TIME_FULL_DATE_WITH_SECONDS);
    }

};
