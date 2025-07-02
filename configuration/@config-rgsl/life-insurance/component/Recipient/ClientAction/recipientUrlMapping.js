const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function recipientUrlMapping(input) {

    const partyCode = input.data.recipient?.partyData?.partyCode;
    const partyType = 'NaturalPerson';

    return uriBuilder.getPartyUri(partyType, partyCode);

};
