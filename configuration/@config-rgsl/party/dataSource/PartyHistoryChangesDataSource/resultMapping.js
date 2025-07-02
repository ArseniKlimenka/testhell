'use strict';

const { businessClock } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.body = JSON.parse(input.BODY);
    output.sysUpdatedOn = businessClock.convertFromBusinessTimeToUTC(input.SYS_UPDATED_ON);
    output.sysUpdatedByUserName = input.USERNAME;

    return output;

};
