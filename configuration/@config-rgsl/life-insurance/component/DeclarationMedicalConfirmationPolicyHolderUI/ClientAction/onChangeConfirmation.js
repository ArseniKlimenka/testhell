module.exports = function onChangeConfirmation(input, ambientProperties) {

    if (input.dataProperty == "isConfirmed")
    { input.data.isNotConfirmed = !input.data.isConfirmed; }
    else
    { input.data.isConfirmed = !input.data.isNotConfirmed; }


    if (input.data.isConfirmed)
    { input.context.Body.declarationMedicalPolicyHolder.forEach(item => item.agreement = true); }
    else
    { null; }

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();

};
