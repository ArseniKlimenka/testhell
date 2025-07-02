'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutHelper = require('@config-rgsl/party/lib/partyTranslationHistoryHelper');

module.exports = function mapping(input, dataSourceResponse) {

    input.partyHistory = printoutHelper.historyMapping(dataSourceResponse);
    input.partyHistory.forEach(_ => _.sysUpdatedOn = dateUtils.formatDate(new Date(_.sysUpdatedOn), dateUtils.DateFormats.CALENDAR));
};
