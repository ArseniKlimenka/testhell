'use strict';

module.exports = function onStartDateChanged(input) {

    const startDate = input.componentContext.startDate;
    input.componentContext.conclusionDate = startDate;

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
