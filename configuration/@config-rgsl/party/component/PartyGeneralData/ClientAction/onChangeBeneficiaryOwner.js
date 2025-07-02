module.exports = function onChangeBeneficiaryOwner(input) {

    input.data.anotherNaturalPersons = [];

    this.view.reevaluateRules();
    this.view.validate();

};
