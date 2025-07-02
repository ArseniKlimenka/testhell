const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function applicantUrlMapping(input) {

    const partyCode = input.context.Body.applicant.partyData.partyCode;
    const partyType = 'NaturalPerson';

    return uriBuilder.getPartyUri(partyType, partyCode);

};
