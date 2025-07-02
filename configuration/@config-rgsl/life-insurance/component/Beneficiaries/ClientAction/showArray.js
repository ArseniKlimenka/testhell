module.exports = function showArray(input, ambientProperties) {

    if (input.componentContext && input.componentContext.isNotHeritors) {
        return true;
    }

    input.componentContext.beneficiaries = [];
    return false;


};
