'use strict';

module.exports = function injurySubgroupRequestMapping(input) {

    const groupDescription = input.context.request.data.criteria?.group?.description;
    const ruleCode = input.context.request.data.criteria?.insuranceRule?.code;

    const result = {};
    result.data = {};
    result.data.criteria = {};

    result.data.criteria.group = groupDescription ?? '';
    result.data.criteria.ruleCode = ruleCode ?? '';
    result.data.criteria.subgroupDescriptionLevel1 = input.searchText ?? '';

    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
