'use strict';

module.exports = function linkNameMapping(input) {

    const partyCode = input.componentContext.agent?.partyCode;
    return partyCode ? "Открыть карточку участника" : undefined;
};
