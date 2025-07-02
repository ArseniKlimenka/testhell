'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { LocalDate } = require('@js-joda/core');
const { sportCodes } = require('@config-rgsl/infrastructure/lib/sportConstants.js');

module.exports = function filterSportTypes(input) {

    let result = input.items;
    const issueDate = input?.additionalContext?.issueDate;
    const dateToCompareKarting = issueDate || LocalDate.now().toString();

    if (dateTimeUtils.isBefore(dateTimeUtils.formatDate(dateToCompareKarting), dateTimeUtils.formatDate('2025-04-30'))) {
        result = result.filter(item => item.code !== sportCodes.karting);
    }

    return result;
};
