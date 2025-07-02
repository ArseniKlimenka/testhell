'use strict';

module.exports = function organisationUnitOnSelected(input) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0].resultData;
        input.componentContext.organisationUnit = {};
        input.componentContext.organisationUnit.code = selected.code;
        input.componentContext.organisationUnit.name = selected.name;
    }
};
