'use strict';

module.exports = function insuranceRulesRequestMapping(input) {

    const result = {};
    result.data = {};
    result.data.criteria = {};
    result.data.criteria.ruleDescription = {};

    if (input.searchText) {
        result.data.criteria.ruleDescription = input.searchText;
    }
    else {
        result.data.criteria.ruleDescription = input.context.request.data.criteria.insuranceRule?.description ?? '';
    }

    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
