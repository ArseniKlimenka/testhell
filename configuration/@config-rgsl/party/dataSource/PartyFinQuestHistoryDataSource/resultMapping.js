const { businessClock } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.sysUpdatedOn = businessClock.convertFromBusinessTimeToUTC(input.sys_updated_on);
    output.question1 = input.question1 == "true" ? 'Да' : (input.question1 == "false" ? 'Нет' : '');
    output.question2 = input.question2 == "true" ? 'Да' : (input.question2 == "false" ? 'Нет' : '');
    output.question3 = input.question3 == "true" ? 'Да' : (input.question3 == "false" ? 'Нет' : '');
    output.question4 = input.question4 == "true" ? 'Да' : (input.question4 == "false" ? 'Нет' : '');
    output.question5 = input.question5 == "true" ? 'Да' : (input.question5 == "false" ? 'Нет' : '');
    output.sysUpdatedBy = input.sys_updated_by;

    return output;

};
