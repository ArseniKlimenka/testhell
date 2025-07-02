module.exports = function showDescriptionForGoalOfFinancialActivity(input) {

    const goalOfFinancialActivity = input.componentContext.goalOfFinancialActivity;

    if (!goalOfFinancialActivity)
    { return false; }

    if (goalOfFinancialActivity?.goalOfFinancialActivityDesc === "Иная") {
        return true;
    }
    input.componentContext.descriptionForGoalOfFinancialActivity = undefined;
    return false;

};
