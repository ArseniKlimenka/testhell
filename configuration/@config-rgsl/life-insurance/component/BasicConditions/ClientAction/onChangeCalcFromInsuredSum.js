module.exports = function onChangeCalcFromInsuredSum(input) {

    input.componentContext.riskPremium = undefined;
    input.componentContext.riskInsuredSum = undefined;

    this.view.validate();
    this.view.reevaluateRules();
};
