module.exports = function resultMapping(input) {
    const output = {};

    output.code = input.code;
    output.name = input.body.name;
    output.parentCalendarCode = input.parentCode;
    output.applicationUserId = input.body.applicationUserId;
    output.timeZone = input.body.timeZone;

    return output;
};
