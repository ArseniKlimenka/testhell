'use strict';
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input, dataSourceResponse) {

    if (!dataSourceResponse.data) {
        return;
    }

    input.partyFinQuest2023 = dataSourceResponse.data.map(_ => _.resultData);
    input.partyFinQuest2023.forEach(_ => _.sysUpdatedBy = dateUtils.formatDate(new Date(_.sysUpdatedOn), dateUtils.DateFormats.CALENDAR));
};
