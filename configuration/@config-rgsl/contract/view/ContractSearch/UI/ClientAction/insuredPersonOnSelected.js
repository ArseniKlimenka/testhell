'use strict';

module.exports = function insuredPersonOnSelected(input) {

    const lookupSelection = input.getLookupSelection();
    input.data.request.data.criteria.insuredPerson = lookupSelection[0].metadata.code;

};
