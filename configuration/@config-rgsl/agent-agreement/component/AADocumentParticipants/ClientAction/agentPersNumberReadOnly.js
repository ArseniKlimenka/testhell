'use strict';

module.exports = function agentPersNumberReadOnly(input) {

    const agentCode = input.componentContext.agent?.partyCode;
    return input.rootContext.ClientViewModel.isDocumentLocked || !agentCode;
};
