'use strict';

module.exports = function recipientResultAssignment(input) {

    const lookupSelection = input.getLookupSelection();
    input.data.request.data.criteria.recipientCode = lookupSelection[0].metadata.code;

};
