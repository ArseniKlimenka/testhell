'use strict';

module.exports = function organisationUnitOnSelected(input) {

    const lookupSelection = input.getLookupSelection();

    const organisation = lookupSelection[0].resultData;

    const unitCodes = [];
    fillCodesList(lookupSelection, unitCodes);

    const officeCodes = [];
    fillOfficeCodesList(lookupSelection, officeCodes);

    input.context.Body.organisation = {};
    input.context.Body.organisation.id = organisation.id;
    input.context.Body.organisation.code = organisation.code;
    input.context.Body.organisation.name = organisation.name;
    input.context.Body.organisation.parentId = organisation.parentId;
    input.context.Body.organisation.unitCodes = unitCodes;
    input.context.Body.organisation.officeCodes = officeCodes;

    function fillCodesList(parentUnit, codesList) {
        parentUnit.forEach(item => {
            codesList.push(item.resultData.code);
            const itemChildren = item.children;
            if (itemChildren && itemChildren.length > 0) {
                fillCodesList(itemChildren, codesList);
            }
        });
    }

    function fillOfficeCodesList(parentUnit, codesList) {
        parentUnit.forEach(item => {
            codesList.push(item.resultData.officeCode);
            const itemChildren = item.children;
            if (itemChildren && itemChildren.length > 0) {
                fillOfficeCodesList(itemChildren, codesList);
            }
        });
    }

};
