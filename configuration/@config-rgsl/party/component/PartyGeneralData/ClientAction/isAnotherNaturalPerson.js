module.exports = function isAnotherNaturalPerson (input) {
    let result = false;
    const beneficiaryOwnerCode = input.componentContext.beneficiaryOwner?.beneficiaryOwnerCode;
    if (beneficiaryOwnerCode == 2) {
        result = true;
    }
    return result;
};
