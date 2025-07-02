module.exports = function applyData(input, result) {
    const body = this?.businessContext?.rootData;
    const workCalendar = result?.workCalendar;

    if (!workCalendar || workCalendar.length === 0) {
        return;
    }
    const workCalendarSorted = workCalendar.sort((a, b) => a.date > b.date ? 1 : -1);
    const workingDays = workCalendarSorted.filter(workingDays => workingDays.ruleLevel != 'exception');
    body.amendmentData.finChangeAmendmentData.calculationDate = workingDays[0].date;
};
