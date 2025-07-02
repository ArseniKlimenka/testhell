'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input, dataSourceResponse) {

    if (!dataSourceResponse.data) {
        return;
    }

    input.partyFinQuest = dataSourceResponse.data.map(_ => _.resultData);
    input.partyFinQuest.forEach(_ => _.sysUpdatedOn = dateUtils.formatDate(new Date(_.sysUpdatedOn), dateUtils.DateFormats.CALENDAR));
};
