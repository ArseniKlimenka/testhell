'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.userGroupId = input.APPLICATION_USER_GROUP_ID;
    output.userGroupCode = input.APPLICATION_USER_GROUP_CODE;

    return output;

};
