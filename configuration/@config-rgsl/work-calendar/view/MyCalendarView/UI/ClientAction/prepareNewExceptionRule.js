'use strict';
const { LocalDate } = require('@js-joda/core');

module.exports = function prepareNewExceptionRule(input) {
    const { affectedRow } = input;

    affectedRow.ruleLevel = 'exception';
    affectedRow.dateFrom = LocalDate.now().toString();
    affectedRow.repetition = {
        pattern: 'daily'
    };

    return true;
};
