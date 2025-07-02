const workCalendarUtils = require('@config-rgsl/work-calendar/lib/WorkCalendarUtilsImpl');
/**
 * @errorCode {errorCode} TimeFromCantBeAfterTimeTo
 * @errorCode {errorCode} CapacitySetToLargeForGivenWorkingTimePeriod
 */
module.exports = function validateWorkHours(input) {
    const { timeFrom, timeTo, capacity } = input;

    const toMinutes = (time) => workCalendarUtils.getTimeInMinutes(time);

    if (timeFrom && timeTo && toMinutes(timeFrom) > toMinutes(timeTo)) {
        return {
            errorCode: 'TimeFromCantBeAfterTimeTo',
            errorMessage: 'Work hours can\'t begin after they ends'
        };
    }

    if (timeFrom && timeTo && capacity) {
        const workingHoursCapacity = workCalendarUtils.calculateCapacity(timeFrom, timeTo);

        if (capacity > workingHoursCapacity) {
            return {
                errorCode: 'CapacitySetToLargeForGivenWorkingTimePeriod',
                errorMessage: 'Capacity is set to large for the given time period'
            };
        }
    }
};
