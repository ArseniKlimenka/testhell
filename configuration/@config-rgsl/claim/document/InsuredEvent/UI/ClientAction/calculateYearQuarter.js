'use strict';

const { LocalDate } = require('@js-joda/core');

module.exports = function calculateYearQuarter(input) {

    const month = LocalDate.parse(input.data.eventDate).month()._value;
    const quarter = Math.floor((month + 2) / 3);
    input.data.yearQuarter = quarter;
};
