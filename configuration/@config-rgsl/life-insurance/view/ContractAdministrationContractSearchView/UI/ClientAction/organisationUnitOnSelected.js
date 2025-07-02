'use strict';

module.exports = function organisationUnitOnSelected(input) {

    const lookupSelection = input.getLookupSelection();

    const organisationUnitCode = lookupSelection[0].resultData.code;
    input.data.request.data.criteria.organisationUnitCode = organisationUnitCode;

    const organisationUnitName = lookupSelection[0].resultData.name;
    input.data.request.data.criteria.organisationUnitName = organisationUnitName;

    const organisationUnitCodes = [];
    fillCodesList(lookupSelection, organisationUnitCodes);
    input.data.request.data.criteria.organisationUnitCodes = organisationUnitCodes;

    function fillCodesList(parentUnit, codesList) {
        parentUnit.forEach(item => {
            codesList.push(item.resultData.code);
            const itemChildren = item.children;
            if (itemChildren && itemChildren.length > 0) {
                fillCodesList(itemChildren, codesList);
            }
        });
    }

};
