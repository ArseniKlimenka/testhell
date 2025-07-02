'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function rule(input) {

    const assignmentDate = input.commonBody.transitionResult?.attributes?.executionTime;
    const parsedDate = dateUtils.parseToLocalDate(assignmentDate);
    const finalDate = dateUtils.addYears(parsedDate, 3);
    const currentDate = dateUtils.dateNow();

    return currentDate < finalDate;
};
