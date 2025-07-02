'use strict';

module.exports = function onEventTypeChanged(input) {

    delete input.context.Body.mainAttributes.eventReason;
    delete input.context.Body.mainAttributes.selectedRisk;

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
