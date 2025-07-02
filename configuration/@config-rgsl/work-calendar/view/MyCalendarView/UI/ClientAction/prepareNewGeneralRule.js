'use strict';
const { LocalDate } = require('@js-joda/core');

module.exports = function prepareNewGeneralRule(input) {
    const { affectedRow } = input;

    affectedRow.ruleLevel = 'general';
    affectedRow.dateFrom = LocalDate.now().toString();
    affectedRow.repetition = {
        pattern: 'daily'
    };

    return true;
};
