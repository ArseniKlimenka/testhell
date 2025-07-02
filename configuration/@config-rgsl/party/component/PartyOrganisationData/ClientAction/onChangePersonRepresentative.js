module.exports = function onChangePersonRepresentative(input) {

    input.data.personRepresentative = {};

    this.view.reevaluateRules();
    this.view.validate();
};
