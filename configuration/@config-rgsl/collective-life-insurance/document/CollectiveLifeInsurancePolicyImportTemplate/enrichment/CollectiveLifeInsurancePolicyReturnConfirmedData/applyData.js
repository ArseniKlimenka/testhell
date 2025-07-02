'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function applyData(input) {

    input.confirmedBy = this.applicationContext.originatingUser.displayName;
    input.confirmed = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT_DATETIME);
};
