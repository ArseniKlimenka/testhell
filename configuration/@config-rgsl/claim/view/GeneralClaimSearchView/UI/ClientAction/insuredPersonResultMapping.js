'use strict';

module.exports = function insuredPersonResultMapping(input) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        input.context.request.data.criteria.insuredPersonCode = selected.resultData.code;
        input.context.request.data.criteria.insuredPersonFullName = selected.resultData.fullName;

    }

};
