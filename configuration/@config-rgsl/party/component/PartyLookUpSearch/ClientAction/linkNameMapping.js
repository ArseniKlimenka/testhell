'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function linkNameMapping(input) {

    const componentContextPartyFullName = getValue(input, 'componentContext.partyFullName');
    const contextPartyDataPartyFullName = getValue(input, 'context.partyData.partyFullName'); // inside array like beneficiaries
    const partyFullName = componentContextPartyFullName || contextPartyDataPartyFullName;

    return partyFullName ? "Открыть карточку клиента" : undefined;

};
