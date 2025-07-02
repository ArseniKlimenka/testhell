'use strict';

module.exports = function orgUnitNameOnSelected(input) {

    input.context.Body.orgUnitName = input.getLookupSelection()[0].resultData.name;
    input.context.Body.orgUnitCode = input.getLookupSelection()[0].resultData.code;

};
