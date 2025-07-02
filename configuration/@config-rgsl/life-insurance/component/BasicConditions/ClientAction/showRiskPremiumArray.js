module.exports = function showRiskPremiumArray(input, ambientProperties) {

    const fixedPremiumsArray = input.componentContext.fixedPremiums;
    const calcFromInsuredSum = input.componentContext.calcFromInsuredSum ?? false;

    if (calcFromInsuredSum) { return false; }

    if (fixedPremiumsArray && fixedPremiumsArray.length > 0)
    { return true; }
    return false;

};
