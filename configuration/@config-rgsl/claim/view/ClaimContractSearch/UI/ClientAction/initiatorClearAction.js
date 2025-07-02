'use strict';

module.exports = function initiatorClearAction(input) {

    input.data.request.data.criteria.initiatorServiceProviderCode = undefined;
    input.data.request.data.criteria.initiatorName = undefined;

};
