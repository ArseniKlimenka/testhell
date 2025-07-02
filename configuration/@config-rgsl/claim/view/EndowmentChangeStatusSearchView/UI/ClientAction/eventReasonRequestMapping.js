'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function eventReasonRequestMapping(input) {

    const eventReason = input.data.eventReason;
    const eventType = input.data.eventType;

    const result = basicCtDropdownRequestMapping(eventReason, input.searchText);
    result.data.criteria.typeCode = eventType ? eventType.code : "None";
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
