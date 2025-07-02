'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function dataSourceInputMapping(input) {

    const periodInDays = 1;

    const currentDay = DateTimeUtils.formatDate(new Date().toISOString(), DateTimeUtils.DateFormats.ECMASCRIPT);
    const previousDay = DateTimeUtils.substractDays(currentDay, periodInDays);

    const currentDaySpecificTimeString = currentDay + 'T17:29:00';
    const previousDaySpecificTimeString = previousDay + 'T17:31:00';

    const currentDaySpecificTime = new Date(currentDaySpecificTimeString);
    const previousDaySpecificTime = new Date(previousDaySpecificTimeString);

    return {
        data: {
            criteria: {
                claimState: 'SentToPayment',
                claimStateFrom: previousDaySpecificTime,
                claimStateTo: currentDaySpecificTime
            }
        }
    };

};
