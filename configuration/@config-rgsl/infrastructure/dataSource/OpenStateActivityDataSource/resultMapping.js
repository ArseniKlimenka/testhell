'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.activityId = input.ACTIVITY_ID;
    output.userGroupCode = input.USER_GROUP_CODE;
    output.userName = input.USERNAME;

    return output;

};
