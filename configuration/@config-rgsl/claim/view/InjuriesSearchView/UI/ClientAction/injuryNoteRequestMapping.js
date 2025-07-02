'use strict';

module.exports = function injuryNoteRequestMapping(input) {

    const groupDescription = input.context.request.data.criteria.group?.description;
    const subgroupCodeLevel1 = input.context.request.data.criteria.subgroupLevel1?.code;
    const subgroupCodeLevel2 = input.context.request.data.criteria.subgroupLevel2?.code;
    const subgroupCodeLevel3 = input.context.request.data.criteria.subgroupLevel3?.code;
    const ruleCode = input.context.request.data.criteria?.insuranceRule?.code;
    const description = input.context.request.data.criteria?.description?.description;

    const result = {};
    result.data = {};
    result.data.criteria = {};

    result.data.criteria.group = groupDescription ?? '';
    result.data.criteria.subgroupCodeLevel1 = subgroupCodeLevel1 ?? '';
    result.data.criteria.subgroupCodeLevel2 = subgroupCodeLevel2 ?? '';
    result.data.criteria.subgroupCodeLevel3 = subgroupCodeLevel3 ?? '';
    result.data.criteria.ruleCode = ruleCode ?? '';
    result.data.criteria.description = description ?? '';
    result.data.criteria.note = input.searchText ?? '';

    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
