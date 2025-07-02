'use strict';

module.exports = function getNumber(input) {

    if (input.context.ConfigurationCodeName === 'AgentAgreement' && input.rootContext.manualDocumentNumber) {
        return input.rootContext.manualDocumentNumber;
    }

    return input.componentContext.Number;
};
