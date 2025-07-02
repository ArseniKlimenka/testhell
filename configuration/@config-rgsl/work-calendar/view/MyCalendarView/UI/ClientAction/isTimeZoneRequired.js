'use strict';

module.exports = function isTimeZoneRequired(input) {
    return !input.data.parentCalendarCode;
};
