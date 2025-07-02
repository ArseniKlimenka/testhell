'use strict';
const { LocalDate } = require('@js-joda/core');

/**
 * Function that retrieves calendar date rules, how to color the dates, what tooltips to use.
 */
module.exports = function retrieveCalendarRulesForMonth(input, ambientProperties) {
    const {
        month,
        year
    } = input;

    let data = input.context;
    if (input.dataProperty) {
        data = data[input.dataProperty];
    } else if (data.Body && data.Body.workCalendar) {
        data = data.Body.workCalendar;
    }

    // If calendar is not saved, there are no rules saved:
    if (!data.IsSaved) {
        return new Promise(resolve => {
            resolve(convertAvailabilityToCalendarRules([], year, month));
        });
    }

    const fromDateString = LocalDate.of(year, month + 1, 1).toString();
    const toDateString = LocalDate.of(year, month + 1, 1).plusMonths(1).minusDays(1).toString();

    // Prepare request for obtaining availability for the calendar on the specified month:
    const getAvailabilityRequest = {
        method: "GET",
        url: `api/organisation/public/work-calendars/${data.Code}/availability?from=${fromDateString}&to=${toDateString}`
    };

    // Call API:
    return ambientProperties.services.api.call(getAvailabilityRequest).then((result) => {
        return convertAvailabilityToCalendarRules(result.availabilityPerDate, year, month);
    }, (err) => {
        throw err.data;
    });
};

/**
 * Conversion of availability data to calendar display data.
 *
 * @param {Array} availabilityByDate - All availabilities retrieved from server.
 * @param {number} year - Year we're retrieving the rules for (e.g. 1999).
 * @param {number} month - Month we're retrieving the rules for (from 0 to 11).
 */
function convertAvailabilityToCalendarRules(availabilityByDate, year, month) {
    // Get number of days in the month:
    const numberOfDaysInMonth = LocalDate.of(year, month + 1, 1).lengthOfMonth();

    // By default, nothing is a workday:
    const defaultRules = new Array(numberOfDaysInMonth).fill(undefined).map((element, elementIndex) => {
        return {
            date: LocalDate.of(year, month + 1, elementIndex + 1).toString(),
            color: 'silver'
        };
    }).map(dateElement => [dateElement.date, dateElement]);

    // If there are any availabilities configured, map it to color / description data:
    const availabilityRules = availabilityByDate.map((availability) => {
        return {
            date: availability.date,
            description: availability.description,
            color: getColor(availability)
        };
    }).map(dateElement => [dateElement.date, dateElement]);

    // Override default rules for days that are defined by availability rules:
    const map = new Map(defaultRules.concat(availabilityRules));

    return [...map.values()];
}

/**
 * Decide how to color the date for a specific availability calculation.
 *
 * @param {Object} availability - Availability data for a specific date.
 */
function getColor(availability) {
    // Normal work days:
    if (availability.ruleLevel === 'general' && availability.numberOfWorkHours > 0.0) {
        return 'black';
    }
    // Days, where there is an availability set by exception:
    else if (availability.ruleLevel === 'exception' && availability.numberOfWorkHours > 0.0) {
        return 'blue';
    }
    // Days, where there is no availability set by exception:
    else if (availability.ruleLevel === 'exception' && (!availability.numberOfWorkHours || availability.numberOfWorkHours === 0.0)) {
        return 'red';
    }
    // Non-workdays, that are not exceptions:

    return 'silver';

}
