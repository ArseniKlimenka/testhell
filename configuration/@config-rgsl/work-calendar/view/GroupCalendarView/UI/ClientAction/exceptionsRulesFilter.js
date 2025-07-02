'use strict';

const workCalendarUtils = require('@config-rgsl/work-calendar/lib/WorkCalendarUtilsImpl');

module.exports = function exceptionsRulesFilter(input, ambientProperties) {
    const { data, obj } = input;

    const criteria = input.data.criteria;

    return (!criteria.selectedUser || obj.applicationUserId == criteria.selectedUser.userId)
        && ((!criteria.dateFrom && !criteria.dateTo) || workCalendarUtils.isRuleInDateRange(obj, criteria.dateFrom, criteria.dateTo));
};
