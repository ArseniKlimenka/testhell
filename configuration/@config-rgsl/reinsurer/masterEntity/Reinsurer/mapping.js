'use strict';

module.exports = function mapping(input) {

    const commonBody = {};

    commonBody.partyId = input.partyId;
    commonBody.partyCode = input.partyCode;

    commonBody.attributes = {
        partyDisplayName: input.partyDisplayName,
        partyShortName: input.partyShortName,
        businessCode: input.reinsurerCode
    };

    return commonBody;

};
