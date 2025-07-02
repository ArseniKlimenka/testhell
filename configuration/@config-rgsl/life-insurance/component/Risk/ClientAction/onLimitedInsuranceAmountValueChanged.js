module.exports = function onLimitedInsuranceAmountValueChanged(input, ambientProperties) {

    if (input.data.isLimitedInsuranceAmount) { input.data.isUnifiedInsuranceAmount = false; }
};
