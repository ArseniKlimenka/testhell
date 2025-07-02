module.exports = function onUnifiedInsuranceAmountValueChanged(input, ambientProperties) {

    if (input.data.isUnifiedInsuranceAmount) { input.data.isLimitedInsuranceAmount = false; }
};
