module.exports = function showDescriptionForIncomeSource(input) {

    const incomeSource = input.componentContext.incomeSource;

    if (!incomeSource)
    { return false; }

    if (incomeSource.incomeSourceDesc === "Иное") {
        return true;
    }
    input.componentContext.descriptionForIncomeSource = undefined;
    return false;

};
