'use strict';

module.exports = function contractClearAction(input) {

    input.data.request.data.criteria.contractNo = undefined;

};
