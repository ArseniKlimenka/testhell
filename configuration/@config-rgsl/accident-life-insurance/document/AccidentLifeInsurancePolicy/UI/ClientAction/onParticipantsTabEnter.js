module.exports = function onParticipantsTabEnter(input, ambientProperties) {

    input.context.ClientViewModel = input.context.ClientViewModel || {};
    input.context.ClientViewModel.hidePartyLookUpSearchLookUpInputs = false;
    this.view.reevaluateRules();

};
