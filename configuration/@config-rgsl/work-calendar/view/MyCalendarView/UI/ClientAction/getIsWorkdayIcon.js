'use strict';

const workCalendarUtils = require('@config-rgsl/work-calendar/lib/WorkCalendarUtilsImpl');

module.exports = function getIsWorkdayIcon(input) {
    if (input && input.data) {
        return workCalendarUtils.getIsWorkdayIcon(input.data.isWork);
    }

    return undefined;
};
