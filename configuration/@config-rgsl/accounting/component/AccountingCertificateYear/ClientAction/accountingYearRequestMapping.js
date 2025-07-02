'use strict';

const { LocalDate } = require('@js-joda/core');

module.exports = function accountingYearRequestMapping(input) {

    const accountingYearsStart = '2015';
    const currentYear = LocalDate.now().year();
    const yearsToAdd = 2;

    const searchCriteria = {};
    searchCriteria.fromYear = accountingYearsStart;
    searchCriteria.toYear = (currentYear + yearsToAdd).toString();

    return {
        data: {
            criteria: searchCriteria
        }
    };

};
