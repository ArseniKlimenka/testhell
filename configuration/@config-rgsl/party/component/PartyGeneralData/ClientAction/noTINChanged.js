module.exports = function noTINChanged(input) {

    input.data.TIN = undefined;
    input.data.nonResidentCode = undefined;
    input.data.TINAbsenceReason = undefined;

    this.view.reevaluateRules();
    this.view.validate();

};
