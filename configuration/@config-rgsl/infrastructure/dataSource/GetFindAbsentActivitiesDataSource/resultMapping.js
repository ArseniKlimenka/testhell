
module.exports = function resultMapping(input) {

    const output = {};
    output.sysCreatedOn = input.SYS_CREATED_ON;
    output.dateFrom = input.DATE_FROM;
    output.dateTo = input.DATE_TO;
    output.stateDescription = input.STATE_DESCRIPTION;
    output.absentActivities = input.ABSENT_ACTIVITIES;
    return output;
};
