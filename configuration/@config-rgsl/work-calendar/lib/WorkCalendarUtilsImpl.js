/**
 * Check if work calendar rule is in the given date range.
 * When rule is yearly then also checks event day.
 * When rule is weekly then also checks weekday.
 */
function isRuleInDateRange(rule, dateFrom, dateTo) {
    const searchDateRange = {
        from: getDateWithoutTimeComponent(new Date(dateFrom || '0001-01-01')),
        to: getDateWithoutTimeComponent(new Date(dateTo || '9999-01-01'))
    };

    const ruleDateRange = {
        from: getDateWithoutTimeComponent(new Date(rule.dateFrom || '0001-01-01')),
        to: getDateWithoutTimeComponent(new Date(rule.dateTo || '9999-01-01'))
    };

    // Date ranges must overlap
    if (searchDateRange.from > ruleDateRange.to || searchDateRange.to < ruleDateRange.from) {
        return false;
    }

    // additionally check yearly repetition
    if (rule.repetition.pattern === 'yearly') {
        const eventDate = new Date(rule.repetition.eventDate);
        const dateDay = eventDate.getDate();
        const dateMonth = eventDate.getMonth();

        const intersectDateRange = getDateRangesIntersection(searchDateRange, ruleDateRange);

        const yearsInRange = getYearsInRange(intersectDateRange.from.getFullYear(), intersectDateRange.to.getFullYear());

        // for at least one year, date must fall into the range
        if (!yearsInRange.some(year => {
            const date = getDateWithoutTimeComponent(new Date(year, dateMonth, dateDay));
            return (intersectDateRange.from <= date && date <= intersectDateRange.to);
        })) {
            return false;
        }
    } else if (rule.repetition.pattern === 'weekly') {
        const eventDayOfWeek = weekdaysIndex[rule.repetition.dayOfWeek];

        const intersectDateRange = getDateRangesIntersection(searchDateRange, ruleDateRange);

        const daysDiff = getNumberOfDaysInRange(intersectDateRange);

        // if there is less than 7 days in range check day of the week if fall in to the range
        if (daysDiff < 7) {
            const beginDayOfTheWeek = intersectDateRange.from.getDay();
            const endDayOfTheWeek = intersectDateRange.to.getDay();

            if (eventDayOfWeek < beginDayOfTheWeek || eventDayOfWeek > endDayOfTheWeek) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Fill calendar rules with parent calendar rules.
 */
async function fillRulesWithBaseCalendarRules(body, api) {
    if (!body || !body.parentCalendarCode) {
        return;
    }

    const request = {
        method: 'GET',
        url: `api/organisation/public/work-calendars/${body.parentCalendarCode}/rules`,
        throwException: true
    };

    const parentCalendarRules = await api.call(request);
    parentCalendarRules.forEach(rule => {
        if (!rule.sourceCalendarCode) {
            rule.sourceCalendarCode = body.parentCalendarCode;
        }
    });
    const calendarRules = body.rules.filter(r => !r.sourceCalendarCode);

    body.rules.splice(0, body.rules.length, ...parentCalendarRules.concat(calendarRules));
}

/**
 * Get repetition message for the work calendar rule
 * @param {object} rule Work calendar rule.
 * @param {string} formId Id of the form. Used for translation purposes.
 * @param {object} ambientProperties Client action ambient properties.
 */
function getRepetitionMessage(rule, formId, ambientProperties) {
    const translate = ambientProperties.services.translate.getSync;

    const repetitionPattern = translate(formId.toUpperCase(), `${formId}@RepetitionPattern@${rule.repetition.pattern}`);

    if (rule.repetition.pattern === 'daily') {
        return repetitionPattern;
    } else if (rule.repetition.pattern === 'weekly' && rule.repetition.dayOfWeek) {
        const dayOfWeek = translate(formId, `${formId}@DayOfWeek@${rule.repetition.dayOfWeek}`);
        return dayOfWeek;
    } else if (rule.repetition.pattern === 'yearly' && rule.repetition.eventDate) {
        const dateParts = rule.repetition.eventDate.split('-');
        const eventDate = `${(dateParts[2])}.${(dateParts[1])}.`;
        return eventDate;
    }

    return '';
}

/**
 * Return icon for work calendar rule used on arrays to show if rule is for workday or non working day.
 * @param {boolean} isWork
 */
function getIsWorkdayIcon(isWork) {
    if (isWork) {
        return {
            name: 'Check',
            size: 'Medium',
            color: 'TextColor',
            description: 'On work'
        };
    }
}

function getDateRangesIntersection(dateRangeA, dateRangeB) {
    return {
        from: dateRangeA.from > dateRangeB.from ? dateRangeA.from : dateRangeB.from,
        to: dateRangeA.to > dateRangeB.to ? dateRangeB.to : dateRangeA.to
    };
}

function getYearsInRange(startYear, endYear) {
    if (endYear < startYear) {
        return [];
    }

    const yearsInRange = [];
    for (let year = startYear; year <= endYear; year++) {
        yearsInRange.push(year);
    }

    return yearsInRange;
}

function getNumberOfDaysInRange(dateRange) {
    const ms = (dateRange.to - dateRange.from);
    return (ms / 1000 / 60 / 60 / 24) + 1; // ms to days + 1 day
}

const weekdaysIndex = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
    saturday: 5,
    sunday: 6
};

function getDateWithoutTimeComponent(date) {
    return new Date(date.toDateString());
}

/**
 * Calculate capacity for given time period (from - to) in hours.
 * @param {time} from Time period from (e.g. 07:00)
 * @param {time} to Time period to (e.g. 8:30)
 */
function calculateCapacity(from, to) {
    if (!from || !to) {
        return 0;
    }

    const minutesFrom = getTimeInMinutes(from);
    const minutesTo = getTimeInMinutes(to);

    if (minutesFrom >= minutesTo) {
        return 0;
    }

    const totalMinutes = minutesTo - minutesFrom;

    return parseFloat((totalMinutes / 60).toFixed(2));
}

/**
 * Returns how many minutes has passed from 00:00 to the given time of the day.
 * @param {string} time Time of the day (e.g 18:30, 03:05)
 */
function getTimeInMinutes(time) {
    const timeParts = time.split(':');

    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    return hours * 60 + minutes;
}

module.exports = {
    fillRulesWithBaseCalendarRules: fillRulesWithBaseCalendarRules,
    isRuleInDateRange: isRuleInDateRange,
    getRepetitionMessage: getRepetitionMessage,
    getIsWorkdayIcon: getIsWorkdayIcon,
    getTimeInMinutes: getTimeInMinutes,
    calculateCapacity: calculateCapacity
};
