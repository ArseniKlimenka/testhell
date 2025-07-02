'use strict';

module.exports = function recipientClearAction(input) {

    input.data.request.data.criteria.recipientCode = undefined;

};
