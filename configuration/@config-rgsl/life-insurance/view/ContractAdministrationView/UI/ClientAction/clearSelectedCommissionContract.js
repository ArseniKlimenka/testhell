'use strict';

module.exports = function clearSelectedCommissionContract(input) {

    if (input.rootContext.Body.commissionContract) {

        delete input.rootContext.Body.commissionContract;
        delete input.rootContext.Body.agentAgreement;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
