'use strict';
const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl.js');

module.exports = function showSettlementThroughFTD(input, ambientProperties) {

    return ambientProperties.configurationCodeName === partyType.LegalEntity;
};
