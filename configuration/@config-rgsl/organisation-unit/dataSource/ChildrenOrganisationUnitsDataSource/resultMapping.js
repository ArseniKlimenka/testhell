'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.orgUnitId = input.ORGANISATION_UNIT_ID;
    output.orgUnitCode = input.ORGANISATION_UNIT_CODE;

    if (input.PARENT_ID) {
        output.parentId = input.PARENT_ID;
    }

    return output;

};
