'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function partyUrlMapping(input) {

    const applicantInfo = input.data.Body.mainAttributes?.applicationInfo?.applicant;

    if (!applicantInfo) {

        return;
    }

    const partyType = applicantInfo.partyType;
    const partyCode = applicantInfo.partyCode;

    if (!partyType || !partyCode) {

        return;
    }

    return uriBuilder.getPartyUri(partyType, partyCode);
};
