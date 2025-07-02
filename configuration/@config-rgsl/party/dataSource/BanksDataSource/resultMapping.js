'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.id = input.ID;
    output.bic = input.BIC;
    output.name = input.NAME;
    output.registrationNumber = input.REGISTRATION_NUMBER;
    output.correspondentAccount = input.CORRESPONDENT_ACCOUNT;
    output.parentBic = input.PARENT_BIC || undefined;
    output.index = input.ADDRESS_INDEX || undefined;
    output.region = input.REGION || undefined;
    output.areaType = input.AREA_TYPE || undefined;
    output.areaName = input.AREA_NAME || undefined;
    output.addressLine = input.ADDRESS_LINE || undefined;
    output.ftdName = input.FTD_NAME || undefined;

    return output;

};
