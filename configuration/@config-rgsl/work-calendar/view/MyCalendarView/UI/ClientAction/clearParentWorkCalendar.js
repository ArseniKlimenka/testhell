'use strict';

module.exports = function clearParentWorkCalendar(input) {
    const { context, data } = input;

    data.parentCalendarCode = undefined;
    data.parentCalendarName = undefined;
    context.ParentId = undefined;

    data.rules.splice(0, data.rules.length, ...data.rules.filter(r => !r.sourceCalendarCode));

    this.view.reevaluateRules();
};
