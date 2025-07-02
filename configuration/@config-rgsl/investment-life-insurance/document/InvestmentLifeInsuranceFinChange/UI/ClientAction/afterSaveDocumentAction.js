'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function afterSaveDocumentAction(input) {

    this.view.getControlByElementId('migratedPaymentPeriodControl')?.triggerChangeEvent();
    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
    this.view.setClean();
};
