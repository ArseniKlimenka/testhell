'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.partyId = input.PARTY_ID;
    output.partyCode = input.PARTY_CODE;
    output.partyType = input.CODE_NAME;
    output.body = JSON.parse(input.BODY);

    return output;

};
