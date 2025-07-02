'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function partyUrlMapping(input) {

    const dataProperty = getValue(input, 'dataProperty');

    const partyType = !dataProperty ? getValue(input, 'data.partyType') : getValue(input, `data.${dataProperty}.partyType`);
    const partyCode = !dataProperty ? getValue(input, 'data.partyCode') : getValue(input, `data.${dataProperty}.partyCode`);
    if (!partyType || !partyCode) { return; }

    return uriBuilder.getPartyUri(partyType, partyCode);

};
