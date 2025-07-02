'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function insuredEventReasonRequestMapping(input) {

    const insuredEventReason = input.data.insuredEventReason;
    const insuredEventType = input.data.insuredEventType;

    const result = basicCtDropdownRequestMapping(insuredEventReason, input.searchText);
    result.data.criteria.typeCode = insuredEventType ? insuredEventType.code : "None";
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
