'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.serviceProviderId = input.SERVICE_PROVIDER_ID;
    output.serviceProviderCode = parseInt(input.SERVICE_PROVIDER_CODE);
    output.body = JSON.parse(input.BODY);
    output.commonBody = JSON.parse(input.COMMON_BODY);
    output.partyCode = parseInt(input.PARTY_CODE);
    output.partnerCode = parseInt(input.PARTNER_CODE);
    output.partnerType = input.PARTNER_TYPE;

    return output;

};
