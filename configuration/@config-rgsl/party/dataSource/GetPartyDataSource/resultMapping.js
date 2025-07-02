'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.partyId = input.PARTY_ID;
    output.partyCode = input.PARTY_CODE;
    output.partyType = input.CODE_NAME;
    output.commonBody = JSON.parse(input.COMMON_BODY);
    output.body = JSON.parse(input.BODY);
    output.tabNumber = input.TAB_NUMBER;
    return output;
};
