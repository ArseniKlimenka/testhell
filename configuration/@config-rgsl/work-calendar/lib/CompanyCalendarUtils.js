'use strict';

const { LocalDate } = require('@js-joda/core');
const { workCalendarAvailability } = require('@adinsure/runtime');
const implConstants = require('@config-rgsl/infrastructure/lib/ImplConstants');
const ERROR_CODE_CALENDAR_NOT_FOUND = 'ORG_0027';

/**
 * Calculates date which represents working day after N working days have passed since current date.
 * Company calendar is used to understand working/non-working days and not user's personal calendar.
 *
 * If calendar with specified code does not exist undefined is returned.
 *
 * Example:
 * - Today is Thursday. Function called with numberOfWorkingDays=3
 * - Friday is working day
 * - Saturday, Sunday - non-working
 * - Monday is non-working as defined in company calendar
 * - Function will treat Friday, next Tuesday and Wednesday as working days (3 days)
 * - Result will be next Wednesday
 *
 * @param {number} numberOfWorkingDays Number of working days that should pass.
 * @returns Date of calculated working day. Undefined if calendar not found by code.
 */
function calculateFollowingWorkingDayForCompany(numberOfWorkingDays) {

    const calendarCode = implConstants.workCalendar.companyCalendar;
    const startDate = LocalDate.now().toString();

    try {
        const calculatedDate = workCalendarAvailability.getFollowingWorkingDay(calendarCode, startDate, numberOfWorkingDays);
        return calculatedDate;
    } catch (error) {
        // handle error if calendar with specified code does not exist (e.g. new environment)
        if (error && error.stack) {
            if (error.stack.includes(ERROR_CODE_CALENDAR_NOT_FOUND)) {
                return undefined;
            }
        }
        throw error;
    }
}

module.exports = {
    calculateFollowingWorkingDayForCompany
};
