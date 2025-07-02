'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.userId = input.USER_ID;
    output.notificationId = input.NOTIFICATION_ID;
    output.subject = input.SUBJECT;

    return output;
};
