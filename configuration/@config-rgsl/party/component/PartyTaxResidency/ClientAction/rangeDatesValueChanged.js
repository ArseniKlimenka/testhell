'use strict';
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function rangeDatesValueChanged(input, ambientProperties) {

    const ctx = input.context;
    ctx.daysCount = dateTimeUtils.getDayDifference(ctx.startDate, ctx.endDate) + 1;

    this.view.reevaluateRules();
    this.view.validate();

};
