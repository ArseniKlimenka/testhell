'use strict';

module.exports = function onChangeCreditProgramId(input) {

    const body = input.context.Body;
    const creditProgramId = input.componentContext.creditProgramId;

    body.risks = [];

    if (creditProgramId == 'РЖ08' || creditProgramId == 'РЖ36') {
        input.componentContext.percentRateImpact = true;
    }
    else {
        input.componentContext.percentRateImpact = false;
        body.creditContract.creditRateRefuse = undefined;
    }

    this.view.reevaluateRules();
    this.view.validate();

};
