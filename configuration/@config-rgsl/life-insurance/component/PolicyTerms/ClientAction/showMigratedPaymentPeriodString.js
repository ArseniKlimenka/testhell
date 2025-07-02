'use strict';

module.exports = function showMigratedPaymentPeriodString(input, ambientProperties) {

    return input.rootContext.Body.migrationAttributes?.isMigrated ?? false;
};
