module.exports = function mapping(input) {
    const commonBody = {
        applicationUserId: input.applicationUserId
    };

    if (input.rules) {
        commonBody.rules = input.rules.filter(r => !r.sourceCalendarCode);
    }

    return commonBody;
};
