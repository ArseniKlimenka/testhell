'use strict';
const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function linkToAAOverview(input) {
    const searchData = input.data.resultData;
    const documentCode = searchData.aaNumber;

    if (documentCode) {
        return uriBuilder.getAgentAgreementUri(documentCode, 'AgentAgreement');
    }
};
