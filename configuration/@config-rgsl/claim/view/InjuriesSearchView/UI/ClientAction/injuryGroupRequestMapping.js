'use strict';

module.exports = function injuryGroupRequestMapping(input) {

    const ruleCode = input.context.request.data.criteria?.insuranceRule?.code;

    const result = {};
    result.data = {};
    result.data.criteria = {};
    result.data.criteria.injuryGroup = {};
    result.data.criteria.ruleCode = {};

    result.data.criteria.injuryGroup = input.searchText ?? '';
    result.data.criteria.ruleCode = ruleCode ?? '';

    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
