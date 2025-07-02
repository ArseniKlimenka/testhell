'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function addressOnPrepareAddedRow(input, ambientProperties) {

    input.affectedRow.actualFrom = dateTimeUtils.newDateAsString();

    return true;
};
