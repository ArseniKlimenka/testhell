'use strict';

const workCalendarUtils = require('@config-rgsl/work-calendar/lib/WorkCalendarUtilsImpl');

module.exports = function getRepetitionMessage(input, ambientProperties) {
    return workCalendarUtils.getRepetitionMessage(input.data, input.context.ConfigurationCodeName, ambientProperties);
};
