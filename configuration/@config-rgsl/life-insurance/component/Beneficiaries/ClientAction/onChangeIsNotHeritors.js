module.exports = function onChangeIsNotHeritors(input, ambientProperties) {

    input.data.isHeritors = !input.data.isNotHeritors;
    this.view.validate();
    this.view.reevaluateRules();

};
