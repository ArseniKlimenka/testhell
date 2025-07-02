'use strict';

module.exports = function clearSelectedContract(input) {

    if (input.rootContext.Body.contractNumber) {

        delete input.rootContext.Body.contractNumber;
        delete input.context.Body.contractPartnerCode;
        delete input.context.Body.orgUnit;
        delete input.context.Body.availableOrgUnits;
        delete input.context.Body.initiator;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
