'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.applicationUserId = input.APPLICATION_USER_ID;
    output.serviceProviderId = input.SERVICE_PROVIDER_ID;
    output.serviceProviderCode = input.SERVICE_PROVIDER_CODE;
    output.partyId = input.PARTY_ID;
    output.partyCode = input.PARTY_CODE;
    output.partyFullName = input.PARTY_FULL_NAME;
    output.isUserActive = input.IS_USER_ACTIVE === 'true';

    return output;

};
