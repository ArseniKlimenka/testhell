'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function partyUrlMapping(input) {

    const dataProperty = getValue(input, 'dataProperty');
    if (!dataProperty) { return; }

    const partyType = getValue(input, `data.${dataProperty}.partyType`);
    const partyCode = getValue(input, `data.${dataProperty}.partyCode`);
    if (!partyType || !partyCode) { return; }

    return uriBuilder.getPartyUri(partyType, partyCode);

};
