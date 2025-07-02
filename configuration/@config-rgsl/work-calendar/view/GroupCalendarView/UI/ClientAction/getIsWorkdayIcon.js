'use strict';

const workCalendarUtils = require('@config-rgsl/work-calendar/lib/WorkCalendarUtilsImpl');

module.exports = function getIsWorkdayIcon(input) {
    if (input && input.context) {
        return workCalendarUtils.getIsWorkdayIcon(input.context.isWork);
    }

    return undefined;
};
