'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const workCalendar = sinkResult?.availabilityPerDate;

    sinkExchange.workCalendar = workCalendar;
};
