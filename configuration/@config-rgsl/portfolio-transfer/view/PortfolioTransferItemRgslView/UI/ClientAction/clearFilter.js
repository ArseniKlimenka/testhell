'use strict';

module.exports = function clearFilter(input) {

    const request = input.context.request;

    request.data.criteria.contractNumbers = undefined;
    request.data.criteria.transferState = undefined;
    request.data.criteria.holderName = undefined;
};
