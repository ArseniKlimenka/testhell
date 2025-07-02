module.exports = function resultMapping(input) {
    const output = {};

    output.id = input.APPLICATION_USER_GROUP_ID;
    output.code = input.APPLICATION_USER_GROUP_CODE;
    output.name = input.NAME;
    output.type = input.TYPE;

    if (input.ROLES) {
        output.roles = input.ROLES;
    }

    return output;
};
