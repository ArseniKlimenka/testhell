'use strict';

module.exports = function injurySubSubgroupRequestMapping(input) {

    const groupDescription = input.context.request.data.criteria?.group?.description;
    const subgroupCodeLevel1 = input.context.request.data.criteria?.subgroupLevel1?.code;
    const ruleCode = input.context.request.data.criteria?.insuranceRule?.code;

    const result = {};
    result.data = {};
    result.data.criteria = {};

    result.data.criteria.group = groupDescription ?? '';
    result.data.criteria.ruleCode = ruleCode ?? '';
    result.data.criteria.subgroupCodeLevel1 = subgroupCodeLevel1 ?? '';
    result.data.criteria.subgroupDescriptionLevel2 = input.searchText ?? '';

    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
