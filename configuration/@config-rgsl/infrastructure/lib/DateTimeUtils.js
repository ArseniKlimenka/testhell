const { LocalDate, ZonedDateTime, DateTimeFormatter, Period, ChronoUnit, Instant, LocalDateTime, ZoneId } = require('@js-joda/core');
const joda = require('@js-joda/core');

module.exports = {


    /** @enum {DateFormat} Enumerator for date formats
     * @property CALENDAR 'dd.MM.yyyy'
     * @property ECMASCRIPT 'yyyy-MM-dd'
    */
    DateFormats: {
        CALENDAR: 'dd.MM.yyyy',
        ECMASCRIPT: 'yyyy-MM-dd',
        ECMASCRIPT_DATETIME: 'yyyy-MM-dd HH:mm:ss',
        ISO: 'ISO',
        CALENDAR_TIME: 'd.M.yyyy HH:mm',
        CALENDAR_TIME_FULL_DATE: 'dd.MM.yyyy HH:mm',
        CALENDAR_TIME_FULL_DATE_WITH_SECONDS: 'dd.MM.yyyy HH:mm:ss',
        INSURANCE_ACT: 'd/M/yyyy'
    },

    /**
     * @description Converts date to specified format. By default, the function uses ECMASCRIPT format.
     * @param {String | Date | DateTime} date in string, ISO string or Date object format
     * @param {Enumerator} dateFormat specify output parameter for the date
     * @returns {String | undefined} Formatted date or undefined in case nothing was found
     */
    formatDate: function (date, dateFormat = this.DateFormats.ECMASCRIPT) {

        // in case date parameter wasn't provided we should just return whithout
        // throwing any error because this is utility function that can be used
        // over a collections with nullable values
        if (!date || date == null) { return; }

        if (typeof date === 'string' && ((date.includes('T') || date.includes('.')) && date.slice(-1) != 'Z')) { date += 'Z'; }

        const dateToString = new Date(date).toISOString();

        switch (dateFormat) {
            case this.DateFormats.ECMASCRIPT_DATETIME: {
                const dateFormatter = DateTimeFormatter.ofPattern(dateFormat);
                return LocalDateTime.ofInstant(Instant.ofEpochMilli(new Date(date).getTime())).format(dateFormatter);
            }
            case this.DateFormats.ISO:
                return dateToString;
            default: {
                const dateFormatter = DateTimeFormatter.ofPattern(dateFormat);
                return ZonedDateTime.parse(dateToString).format(dateFormatter);
            }
        }
    },

    /**
    * @description Returns curent date formatted in a specified way
    * @param {Enumerator} dateFormat specify output parameter for the date
    * @returns {string} formatted curent date
    */
    newDateAsString: function (dateFormat) {
        return this.formatDate(new Date(), dateFormat);
    },

    /**
     * @description Convert string or Date object to JSJoda object
     * @param {string | Date} date Date in 'yyyy-MM-dd', Date object, ISO string formats
     * @returns {LocalDate} LocalDate JSJoda object
    */
    parseToLocalDate: function (input) {
        return LocalDate.parse(this.formatDate(input));
    },

    /**
     * @description Format Date in 'dd.MM.yyyy' to 'yyyy-MM-dd'
     * @param {string | Date} date Date in 'dd.MM.yyyy' format
     * @returns {LocalDate} Date in ISO string format 'yyyy-MM-dd'
    */
    parseLocalDateToISO: function (inputDate) {

        const formatterInput = DateTimeFormatter.ofPattern('dd.MM.yyyy');
        const formatterOutput = DateTimeFormatter.ofPattern('yyyy-MM-dd');

        const outputDate = LocalDate.parse(inputDate, formatterInput).format(formatterOutput);

        return outputDate;
    },

    /**
     * @description Adds month term to specified date
     * @param {string | Date} date Date in 'yyyy-MM-dd', Date object, ISO string formats
     * @param {number} term Number of months to be added to date
     * @returns {Date} Date object with added month term
     */
    addMonths: function (date, term = 0) {
        if (!date) { return; }
        return this.formatDate(this.parseToLocalDate(date).plusMonths(term));
    },

    /**
     * @description Adds year term to specified date
     * @param {string | Date} date Date in 'yyyy-MM-dd', Date object, ISO string formats
     * @param {number} term Number of years to be added to date
     * @returns {Date} Date object with added year term
     */
    addYears: function (date, term = 0) {
        if (!date) { return; }
        return this.formatDate(this.parseToLocalDate(date).plusYears(term));
    },

    /**
     * @description Substract year term from specified date
     * @param {string | Date} date Date in 'yyyy-MM-dd', Date object, ISO string formats
     * @param {number} term Number of years to be substracted from date
     * @returns {Date} Date object with substracted year term
     */
    substractYears: function (date, term = 0) {
        if (!date) { return; }
        return this.formatDate(this.parseToLocalDate(date).minusYears(term));
    },

    /**
     * @description Adds day term to specified date
     * @param {string | Date} date Date in 'yyyy-MM-dd', Date object, ISO string formats
     * @param {number} term Number of days to be added to date
     * @returns {Date} Date object with added day term
     */
    addDays: function (date, term = 0) {
        if (!date) { return; }
        return this.formatDate(this.parseToLocalDate(date).plusDays(term));
    },

    /**
     * @description Substract day term from specified date
     * @param {string | Date} date Date in 'yyyy-MM-dd', Date object, ISO string formats
     * @param {number} term Number of days to be substracted from date
     * @returns {Date} Date object with substracted day term
     */
    substractDays: function (date, term = 0) {
        if (!date) { return; }
        return this.formatDate(this.parseToLocalDate(date).minusDays(term));
    },

    /**
     * @description Substract month term from specified date
     * @param {string | Date} date Date in 'yyyy-MM-dd', Date object, ISO string formats
     * @param {number} term Number of months to be substracted from date
     * @returns {Date} Date object with substracted month term
     */
    substractMonths: function (date, term = 0) {
        if (!date) { return; }
        return this.formatDate(this.parseToLocalDate(date).minusMonths(term));
    },

    /**
     * @description Calculates difference in years between two dates
     * @param {string | Date} date1 Start date in string, ISO string and Date object format
     * @param {string | Date} date2 End date in string, ISO string and Date object format
     * @returns {number} Number of years
     */
    getYearDifference: function (date1, date2) {
        if (!(date1 && date2)) { return; }
        return Math.abs(this.parseToLocalDate(date1).until(this.parseToLocalDate(date2), ChronoUnit.YEARS));
    },

    /**
     * @description Calculates difference in months between two dates
     * @param {string | Date} date1 Start date in string, ISO string and Date object format
     * @param {string | Date} date2 End date in string, ISO string and Date object format
     * @returns {number} Number of months
     */
    getMonthDifference: function (date1, date2) {
        if (!(date1 && date2)) { return; }
        return Math.abs(this.parseToLocalDate(date1).until(this.parseToLocalDate(date2), ChronoUnit.MONTHS));
    },

    /**
     * @description Calculates difference in days between two dates
     * @param {string | Date} date1 Start date in string, ISO string and Date object format
     * @param {string | Date} date2 End date in string, ISO string and Date object format
     * @returns {number} Number of days
     */
    getDayDifference: function (date1, date2) {
        if (!(date1 && date2)) { return; }
        return Math.abs(this.parseToLocalDate(date1).until(this.parseToLocalDate(date2), ChronoUnit.DAYS));
    },

    /**
     * @description Checks if 1st date is before 2nd one
     * @param {string | Date} date1 First date
     * @param {string | Date} [date2] Second date. If not passed, takes current date
     * @returns {boolean}
     */
    isBefore: function (date1, date2 = this.newDateAsString()) {
        if (!date1) { return; }
        return this.parseToLocalDate(date1).isBefore(this.parseToLocalDate(date2));
    },

    /**
     * @description Checks if 1st date is equal to 2nd one
     * @param {string | Date} date1 First date
     * @param {string | Date} [date2] Second date. If not passed, takes current date
     * @returns {boolean}
     */
    isEqual: function (date1, date2 = this.newDateAsString()) {
        if (!date1) { return; }
        return this.parseToLocalDate(date1).isEqual(this.parseToLocalDate(date2));
    },

    /**
     * @description Checks if 1st date is after 2nd one
     * @param {string | Date} date1 First date
     * @param {string | Date} [date2] Second date. If not passed, takes current date
     * @returns {boolean}
     */
    isAfter: function (date1, date2 = this.newDateAsString()) {
        if (!date1) { return; }
        return this.parseToLocalDate(date1).isAfter(this.parseToLocalDate(date2));
    },

    /**
     * @description Checks if 1st date is after or equal the 2nd one
     * @param {string | Date} date1 First date
     * @param {string | Date} [date2] Second date. If not passed, takes current date
     * @returns {boolean}
     */
    isAfterOrEqual: function (date1, date2 = this.newDateAsString()) {
        return !!(this.isAfter(date1, date2) || this.isEqual(date1, date2));
    },

    /**
     * @description Checks if 1st date is before or equal the 2nd one
     * @param {string | Date} date1 First date
     * @param {string | Date} [date2] Second date. If not passed, takes current date
     * @returns {boolean}
     */
    isBeforeOrEqual: function (date1, date2 = this.newDateAsString()) {
        return !!(this.isBefore(date1, date2) || this.isEqual(date1, date2));
    },

    /**
     * @description Calculates the period between two dates
     * @param {string | Date} date1 First date
     * @param {string | Date} [date2] Second date. If not passed, takes current date
     * @returns {string}
     */
    getPeriod: function (date1, date2 = this.newDateAsString()) {
        if (!date1) { return; }
        return Period.between(LocalDate.parse(date1), LocalDate.parse(date2)).toString();
    },

    /**
     * @description Get period year, month and day
     * @param {string | Date} date1 First date
     * @param {string | Date} [date2] Second date. If not passed, takes current date
     * @returns {object}
     * {year, month, day}, where
     * {integer} year - period year,
     * {integer} month - period month
     * {integer} day - period day
     */
    getPeriodData: function (date1, date2 = this.newDateAsString()) {
        let periodData = {};
        const periodString = this.getPeriod(date1, date2);
        const periodYear = periodString?.match(/\d+(?=\s*Y)/)?.toString();
        const periodMonth = periodString?.match(/\d+(?=\s*M)/)?.toString();
        const periodDay = periodString?.match(/\d+(?=\s*D)/)?.toString();
        periodData = {
            year: periodYear ? parseInt(periodYear) : 0,
            month: periodMonth ? parseInt(periodMonth) : 0,
            day: periodDay ? parseInt(periodDay) : 0
        };
        return periodData;
    },

    /**
     * @description Check is period year more than constant year (accuracy in days)
     * @param {string | Date} date1 First date
     * @param {string | Date} [date2] Second date. If not passed, takes current date
     * @param {integer} yearToCompare Year to compare with period year
     * @example
     * isPeriodYearMoreThanConstYear('2019-01-01', '2021-01-01', 2) //returns false
     * isPeriodYearMoreThanConstYear('2019-01-01', '2021-01-02', 2) //returns true
     * @returns {boolean}
     */
    isPeriodYearMoreThanConstYear: function (date1, date2 = this.newDateAsString(), yearToCompare) {
        const period = this.getPeriodData(date1, date2);
        if (period.year > yearToCompare ||
            (period.year == yearToCompare && (period.month > 0 || period.day > 0))) {
            return true;
        }
        return false;
    },

    /**
     * @description Check is period year more on constant year (accuracy in days)
     * @param {string | Date} date1 First date
     * @param {string | Date} [date2] Second date. If not passed, takes current date
     * @param {integer} yearToCompare Year to compare with period year
     * @example
     * isPeriodYearMoreOnConstYear('2019-01-01', '2021-01-01', 2) //returns true
     * isPeriodYearMoreOnConstYear('2019-01-01', '2021-01-02', 2) //returns false
     * @returns {boolean}
     */
    isPeriodYearMoreOnConstYear: function (date1, date2 = this.newDateAsString(), yearToCompare) {
        const period = this.getPeriodData(date1, this.addDays(date2, 1));

        if (period.year == yearToCompare && period.month == 0 && period.day == 0) {
            return true;
        }
        return false;
    },

    /**
     * @description returns true if two periods are intersected (intersection rule: (StartA <= EndB) and (EndA >= StartB))
     * @param {string | Date} startDate1 Start date of the first period
     * @param {string | Date} endDate1 End date of the first period
     * @param {string | Date} startDate2 Start date of the second period
     * @param {string | Date} endDate2 End date of the second period
     * @returns {boolean}
     */
    periodsIntersected: function (startDate1, endDate1, startDate2, endDate2) {
        if (!(startDate1 && endDate1 && startDate2 && endDate2)) { return; }

        startDate1 = LocalDate.parse(startDate1);
        endDate1 = LocalDate.parse(endDate1);
        startDate2 = LocalDate.parse(startDate2);
        endDate2 = LocalDate.parse(endDate2);

        const noIntersection = startDate1.isAfter(endDate2) || endDate1.isBefore(startDate2);
        return !noIntersection;
    },

    /**
     * @description checks if period that is returneb by getPeriod function is more than 1 year
     * @param {string} period Period in format aYbDcM
     * @returns {boolean} true means period is more than one year
     */
    checkIsDifferenceMoreThanOneYear: function (period) {
        if (!period) { return; }
        const indexY = period.indexOf("Y");
        const yearNumber = period[indexY - 1] ? period[indexY - 1] : 0;
        return yearNumber > 0;
    },

    /**
     * @description Adds year term to specified date and substracts one day from it
     * @param {string | Date} date Date in 'yyyy-MM-dd', Date object, ISO string formats
     * @param {number} term Number of years to be added to date
     * @returns {Date} Date object with added year term and substracted one day
     */
    calculateEndDate: function (date, term = 0) {
        if (!date || date.toString() === "Invalid Date") { return; }

        return this.formatDate(this.parseToLocalDate(date).plusYears(term).minusDays(1));
    },

    /**
     * @description Adds month term to specified date and substract one day from it
     * @param {string | Date} date Date in 'yyyy-MM-dd', Date object, ISO string formats
     * @param {number} term Number of months to be added to date
     * @returns {Date} Date object with added month term and substracted one day
     */
    addMonthsSubstractDay: function (date, term = 0) {
        if (!date) { return; }
        return this.formatDate(this.parseToLocalDate(date).plusMonths(term).minusDays(1));
    },

    /**
     * @description Calculates days amount in year
     * @param {string | Date} date Date in YYYY-MM-DD format
     * @returns Days amoun in year
     */
    getDaysInYear: function (date) {
        if (!date) { return; }
        return this.parseToLocalDate(date).lengthOfYear();
    },

    /**
     * @description
     * Calculates next policy annual date from now.
     * Calculated date must be after 'now' and match annual condition
     * @example
     * calculateNextPolicyYearStartDate('2019-01-01') //if date now is 2019-08-23 returns 2020-01-01
     * calculateNextPolicyYearStartDate('2020-03-20') //if date now is 2024-09-10 returns 2025-03-20
     * @param {String | Date} policyStartDate Policy start date in date object, iso or string format
     * @param {String | Date} [customDate] Custom date to calculate from
     * @returns {String} Calculated next policy annual date
     */
    calculateNextPolicyYearStartDate: function (policyStartDate, dateToCalcFrom = this.newDateAsString()) {
        if (!policyStartDate) { return; }

        const isEven = this.isFullYearBetweenTwoDates(policyStartDate, dateToCalcFrom);
        const yearDifference = this.getYearDifference(policyStartDate, dateToCalcFrom);
        const calculatedAnnualDate = this.formatDate(
            isEven ?
                this.addYears(dateToCalcFrom, 1) :
                this.addYears(policyStartDate, yearDifference + 1)
        );

        return calculatedAnnualDate;
    },

    /**
     * @description Sets year to date
     * @param {Date} date Date in string, ISO string or Date object format
     * @returns {string} Formatted date
     */
    setYear: function (date, year) {
        date = this.parseToLocalDate(date).withYear(year);
        return this.formatDate(date);
    },

    padStr: function (i) {
        return (i < 10) ? '0' + i : '' + i;
    },

    /**
    * Get month from input parameter.
    * @param {string | Date} date date.
    */
    getMonth: function (date) {
        return this.parseToLocalDate(date)._month;
    },

    /**
     * Get year from input parameter.
     * @param {string | Date} date date.
     */
    getYear: function (date) {
        return this.parseToLocalDate(date)._year;
    },

    /**
    * Get day in month from input parameter.
    * @param {string} date date.
    */
    getDay: function (date) {
        return this.parseToLocalDate(date)._day;
    },

    /**
     * Return YYYYMM from date
     * @param {string} date date.
     */
    getYearMonth: function (date) {
        if (!date) { return; }
        return this.getYear(date) * 100 + this.getMonth(date);
    },

    /**
     * @description
     * Calculates the difference between two dates in months and years
     * @param {Data} start Start period date
     * @param {Data} end End period date
     * @returns {Object}
     * {t, tm}, where
     * t - term in years,
     * tm - term in months
     */
    getOffset: function (start, end) {
        const dstart = new Date(start);
        const dend = new Date(end);
        const months = (dend.getMonth() + dend.getFullYear() * 12) - (dstart.getMonth() + dstart.getFullYear() * 12);
        return {
            t: Math.floor(months / 12),
            tm: months % 12
        };
    },

    /**
     * @description
     * Checks is difference between two dates equals to full number of years
     * @param {Date | String} date1 Start date
     * @param {Date | String} date2 End date
     * @example
     * isFullYearBetweenTwoDates('2019-01-01', '2020-01-01') //returns true
     * isFullYearBetweenTwoDates('2018-10-12', '2020-01-01') //returns false
     * @returns {Boolean} Is equal to full number of years
     */
    isFullYearBetweenTwoDates: function (date1, date2) {
        if (!(date1 && date2)) { return; }
        const parsedDate1 = LocalDate.parse(date1);
        const parsedDate2 = LocalDate.parse(date2);
        const period = Period.between(parsedDate1, parsedDate2).toString();
        return Boolean(period.match(/^P-?\d+Y$/));
    },

    /**
     * @description
     * Gets minimum of dates in array of dates
     * @param {Array of Date | String} dates array of dates
     * @returns {Date | String} minimum date in the array
     */
    getMinOfDates: function (dates) {
        let minDate;
        if (dates && dates.length > 0) { minDate = dates.sort((a, b) => new Date(a) - new Date(b))[0]; }

        return minDate;
    },

    /**
     * @description
     * Gets maximum of dates in array of dates
     * @param {Array of Date | String} dates array of dates
     * @returns {Date | String} maximum date in the array
     */
    getMaxOfDates: function (dates) {
        let maxDate;
        if (dates && dates.length > 0) { maxDate = dates.sort((a, b) => new Date(b) - new Date(a))[0]; }

        return maxDate;
    },

    /**
     * @description Returns number of years in the period e.g.
     * @param {Date | String} startDate start date
     * @param {Date | String} endDate end date
     * @returns {integer} Number of years in the period
     */
    getYearNumber: function (startDate, endDate) {
        if (this.isAfter(startDate, endDate)) {
            return 0;
        }

        let year = this.getYearDifference(startDate, endDate);
        const tempDate = this.addYears(startDate, year);

        if (this.isBeforeOrEqual(tempDate, endDate)) {
            year++;
        }

        return year;
    },

    /**
     * @description Returns higher date
     * @param {Date | String} date1 date 1 to compare
     * @param {Date | String} date2 date 2 to compare
     * @returns {Date | String} Higher date
     */
    getMaxDate: function (date1, date2) {
        return this.isBefore(date1, date2) ? date2 : date1;
    },

    /**
     * @description Returns lower date
     * @param {Date | String} date1 date 1 to compare
     * @param {Date | String} date2 date 2 to compare
     * @returns {Date | String} lower date
     */
    getMinDate: function (date1, date2) {
        return this.isBefore(date1, date2) ? date1 : date2;
    },

    /**
     * @description Returns compare integer
     * @param {Date | String} dateA date A to compare
     * @param {Date | String} dateB date B to compare
     * @returns {number} -1, 0 or 1
     */
    compareDates: function (dateA, dateB) {
        return LocalDate.parse(dateA).compareTo(LocalDate.parse(dateB));
    },

    getSpecialLocalDateFromUTCDatetime: function (datetime) {
        return ZonedDateTime.parse(datetime).withZoneSameInstant(ZoneId.systemDefault()).toLocalDate();
    },

    /**
     * Convert dateTime to dateTimeString (YYYY-MM-DDTHH:mm:ssZ) compatible with date-time component;
     * returns current date if we don`t pass anything
     *
     * @param {object} dateTime javascript dateTime object.
     * @returns dateTime string compatible with date-time component
     */
    dateTimeToString: function (dateTime = (new Date())) {

        if (!dateTime) {
            return undefined;
        }

        return new Date(dateTime).toISOString().substring(0, 19) + "Z";
    },

    /**
     * @description Creates a period table
     */
    getPeriodsTable: function (startDate, endDate) {

        const periods = [];

        if (!this.isBefore(startDate, endDate)) { return; }
        const periodsNumber = (this.getYear(endDate) - this.getYear(startDate));

        for (let i = 0; i < periodsNumber; i++) {
            const periodStartDate = this.addYears(startDate, i);
            const periodEndDate = this.addYears(this.addDays(startDate, -1), i + 1);
            periods.push({
                year: i + 1,
                periodStartDate,
                periodEndDate
            });
        }

        return periods;
    },

    /**
     * @description Creates a period table by months
     */
    getPeriodsTableByMonths: function (startDate, endDate, months) {

        const periods = [];

        if (!startDate || !endDate || !months) { return; }
        if (!this.isBeforeOrEqual(startDate, endDate)) { return; }

        let periodNumber = 0;
        let periodStartDate;
        let periodEndDate;
        do {
            periodStartDate = this.addMonths(startDate, periodNumber * months);
            periodEndDate = this.addDays(this.addMonths(startDate, (periodNumber + 1) * months), - 1);
            if (periodEndDate >= endDate) { periodEndDate = endDate; }
            periods.push({
                periodNumber: periodNumber + 1,
                periodStartDate,
                periodEndDate
            });
            periodNumber++;
        } while (periodEndDate < endDate);

        return periods;
    },

    /**
     *
     * @param {Date} date Input date or null for current date
     * @returns first date of month for date parameter
     */
    getFirstDateOfMonth: function (date = Date.now()) {
        const currDate = new Date(date);
        const dt = new Date(Date.UTC(currDate.getFullYear(), currDate.getMonth(), 1));
        return this.formatDate(dt);
    },

    /**
     *
     * @param {Date} date Input date or null for current date
     * @returns last date of month for date parameter
     */
    getLastDateOfMonth: function (date = Date.now()) {
        const currDate = new Date(date);
        const dt = new Date(Date.UTC(currDate.getFullYear(), currDate.getMonth() + 1, 0));
        return this.formatDate(dt);
    },

    /**
     *
     * @param {Date} date Input date or null for current date
     * @returns first date of year
     */
    getFirstDateOfYear: function (date = Date.now()) {
        const currDate = new Date(date);
        const dt = new Date(Date.UTC(currDate.getFullYear(), 0, 1));
        return this.formatDate(dt);
    },

    /**
     * @description Date now to ISO formatted date string ('yyyy-MM-dd').
     *
     * @returns Date now string in ISO date format.
     */
    dateNow: function () {

        const dt = joda.LocalDateTime.now();
        return dt.format(joda.DateTimeFormatter.ISO_LOCAL_DATE);
    },

    /**
     * @description Date and time now to ISO formatted date time string.
     *
     * @returns Date and time now string in ISO date format.
     */
    dateTimeNow: function () {

        const dt = joda.LocalDateTime.now();
        return dt.format(joda.DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    },

    /**
     * @description Returns current year.
     *
     * @returns Year as number.
     */
    yearNow: function () {

        return joda.LocalDateTime.now().year();
    },

    getFirstDayOfEachMonthInPeriod: function (startDate, endDate) {

        let currentDate = startDate;
        let moveNext = true;
        const dates = [];

        while (moveNext) {

            const firstDay = this.getFirstDateOfMonth(currentDate);

            if (firstDay < startDate) {

                currentDate = this.addMonths(currentDate, 1);
                continue;
            }
            else if (firstDay > endDate) {

                moveNext = false;
            }
            else {

                dates.push(firstDay);
                currentDate = this.addMonths(currentDate, 1);
            }
        }

        return dates;
    },

    getDateDifferenceRuString: function (date1, date2) {

        // Ensure both inputs are Date objects
        date1 = new Date(date1);
        date2 = new Date(date2);

        // Calculate differences in terms of years, months, and days
        let years = date2.getFullYear() - date1.getFullYear();
        let months = date2.getMonth() - date1.getMonth();
        let days = date2.getDate() - date1.getDate();

        // Adjust for cases where the day of the month isn't later in the second date
        if (days < 0) {
            months--;
            days += new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Function to get the correct plural form
        function getPluralForm(number, forms) {
            const lastDigit = number % 10;
            const lastTwoDigits = number % 100;
            if (lastTwoDigits >= 10 && lastTwoDigits <= 20) {
                return forms[2];
            }
            if (lastDigit === 1) {
                return forms[0];
            }
            if (lastDigit >= 2 && lastDigit <= 4) {
                return forms[1];
            }
            return forms[2];
        }

        // Build the result string in Russian
        let result = '';
        if (years > 0) {
            result += years + ' ' + getPluralForm(years, ['год', 'года', 'лет']) + ' ';
        }
        if (months > 0) {
            result += months + ' ' + getPluralForm(months, ['месяц', 'месяца', 'месяцев']) + ' ';
        }
        if (days > 0) {
            result += days + ' ' + getPluralForm(days, ['день', 'дня', 'дней']);
        }

        return result.trim().replace(/, $/, '');
    },

    isDateValid: function (dateStr) {
        return !isNaN(new Date(dateStr));
    },

    isDate(value, excludeNumbers = false, excludeDotInString = false) {

        if ((excludeNumbers && typeof value === 'number') || (excludeDotInString && (typeof value === 'string' && value.includes('.')))) {
            return false;
        }

        return value instanceof Date ||
            (typeof value === 'string' && !isNaN(Date.parse(value)));
    },

    dateRangesIntersect(range1From, range1To, range2From, range2To) {

        const d1From = new Date(range1From);
        const d1To = new Date(range1To);
        const d2From = new Date(range2From);
        const d2To = new Date(range2To);

        return d1From <= d2To && d2From <= d1To;
    },

    filterDateRanges(ranges, dateFrom, dateTo, subObject = '', rangeDateFromAttribute = 'issueDateFrom', rangeDateToAttribute = 'issueDateTo') {

        return ranges.filter(range => {

            const rangeDateFrom = subObject ? range[subObject][rangeDateFromAttribute] : range[rangeDateFromAttribute];
            const rangeDateTo = subObject ? range[subObject][rangeDateToAttribute] : range[rangeDateToAttribute];

            return this.dateRangesIntersect(
                rangeDateFrom,
                rangeDateTo,
                dateFrom,
                dateTo
            );
        });
    },

    setContractIssueDate(serverIssueDate) {
        const clientIssueDate = this.dateNow();
        const dayDiff = this.getDayDifference(clientIssueDate, serverIssueDate);

        return this.isBefore(serverIssueDate, clientIssueDate) && dayDiff === 1 ? clientIssueDate : serverIssueDate;
    }
};
