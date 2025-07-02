'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function partyUrlMapping(input) {

    const duplicateMasterNumber = getValue(input, 'context.Body.partyGeneralData.duplicateMasterNumber');

    if (!duplicateMasterNumber) { return; }

    return uriBuilder.getPartyUri('NaturalPerson', duplicateMasterNumber);

};
