
module.exports = function onInsuredEventTypeChanged(input) {

    delete input.context.Body.insuredEventReason;

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
