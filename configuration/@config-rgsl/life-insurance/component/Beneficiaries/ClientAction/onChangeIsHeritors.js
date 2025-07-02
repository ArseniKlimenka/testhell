module.exports = function onChangeIsHeritors(input, ambientProperties) {

    input.data.isNotHeritors = !input.data.isHeritors;
    this.view.validate();
    this.view.reevaluateRules();
};
