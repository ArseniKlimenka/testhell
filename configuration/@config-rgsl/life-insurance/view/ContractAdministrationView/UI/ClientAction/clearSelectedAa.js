'use strict';

module.exports = function clearSelectedAa(input) {

    if (input.rootContext.Body.agentAgreement) {

        delete input.rootContext.Body.agentAgreement;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
