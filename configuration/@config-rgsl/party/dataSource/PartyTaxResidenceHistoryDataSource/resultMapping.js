const { businessClock } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.sysUpdatedOn = businessClock.convertFromBusinessTimeToUTC(input.sys_updated_on);
    output.taxResidence = input.tax_residence;
    output.sysUpdatedBy = input.sys_updated_by;

    return output;

};
