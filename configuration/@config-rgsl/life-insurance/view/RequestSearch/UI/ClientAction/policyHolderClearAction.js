'use strict';

module.exports = function policyHolderClearAction(input) {

    input.data.request.data.criteria.contractHolderCode = undefined;

};
