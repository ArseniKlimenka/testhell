'use strict';

module.exports = function linkNameMapping(input) {

    const componentContextPartyFullName = input.componentContext?.partyFullName;
    const contextPartyDataPartyFullName = input.context?.partyData?.partyFullName;
    const partyFullName = componentContextPartyFullName || contextPartyDataPartyFullName;

    return partyFullName ? "Открыть карточку клиента" : undefined;

};
