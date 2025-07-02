module.exports = function onInsuranceConditionsTabEnter(input, ambientProperties) {

    input.context.ClientViewModel = input.context.ClientViewModel || {};
    input.context.ClientViewModel.hidePartyLookUpSearchLookUpInputs = true;
    this.view.reevaluateRules();

};
