'use strict';
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

function formatDatePrint(date) {

    return dateHelper.formatDate(date, dateHelper.DateFormats.CALENDAR);
}

function formatSignDatePrint(date) {

    return dateHelper.formatDate(date, dateHelper.DateFormats.CALENDAR);
}

function formatSignTimePrint(time) {

    const dotIndex = time.indexOf('.');
    return time.slice(0, dotIndex);
}

module.exports = {
    formatDatePrint,
    formatSignDatePrint,
    formatSignTimePrint
};
