/**
 * @errorCode {errorCode} WeeklyRepetitionMissingDayOfWeek
 * @errorCode {errorCode} YearlyRepetitionMissingDay
 */
module.exports = function validateRepetition(input) {
    const { pattern, dayOfWeek, eventDate } = input;

    if (pattern && pattern === 'weekly' && !dayOfWeek) {
        return {
            errorCode: 'WeeklyRepetitionMissingDayOfWeek',
            errorMessage: 'Day of the week is not set on one of the rules'
        };
    }

    if (pattern && pattern === 'yearly' && !eventDate) {
        return {
            errorCode: 'YearlyRepetitionMissingDay',
            errorMessage: 'Day of the year is not set on one of the rules'
        };
    }
};
