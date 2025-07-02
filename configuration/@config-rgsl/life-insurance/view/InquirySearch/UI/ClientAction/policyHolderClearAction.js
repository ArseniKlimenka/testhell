'use strict';

module.exports = function policyHolderClearAction(input) {

    input.data.request.data.criteria.holderCode = undefined;

};
