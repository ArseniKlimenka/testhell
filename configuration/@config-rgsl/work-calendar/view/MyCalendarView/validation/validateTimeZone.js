/**
 * @errorCode {errorCode} NoTimeZone
 */
module.exports = function validateTimeZone(input) {
    const { timeZone, parentCalendarCode } = input;

    if (!timeZone && !parentCalendarCode) {
        return {
            errorCode: 'NoTimeZone',
            errorDataPath: '/Body/workCalendar/Body/timeZone'
        };
    }
};
