'use strict';

module.exports = function clearFilter(input, ambientProperties) {

    input.data.Body.criteria.selectedUser = undefined;
    input.data.Body.criteria.dateFrom = undefined;
    input.data.Body.criteria.dateTo = undefined;

    this.view.rebind();
};
