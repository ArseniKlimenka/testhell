module.exports = function onChangeConfirmationSport(input, ambientProperties) {

    if (input.dataProperty == "isConfirmedSportInsuredPerson")
    { input.data.isNotConfirmedSportInsuredPerson = !input.data.isConfirmedSportInsuredPerson; }
    else
    { input.data.isConfirmedSportInsuredPerson = !input.data.isNotConfirmedSportInsuredPerson; }

    if (input.data.isConfirmedSportInsuredPerson)
    { input.context.Body.declarationSport.forEach(item => item.agreementInsuredPerson = true); }
    else {
        null;
        // this.view.getControlByElementId('DeclarationMedicalArray').expand();
    }

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();

};
