'use strict';

module.exports = function insuredClearAction(input) {

    input.data.request.data.criteria.insuredPartyCode = undefined;

};
