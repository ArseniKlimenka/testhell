const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { newRules } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
module.exports = function appendixRule(input) {

    const appendix = [];

    if (input?.body?.insuranceRules?.ruleCode == 'AL_2_20230401')
    { appendix.push({
        name: `CommonAppendixImageContainer/img/insuranceRulesAL_2_20230401.pdf`,
        mode: 'Prepend'
    }); }

    if (input?.body?.insuranceRules?.ruleCode == 'L_20230322')
    { appendix.push({
        name: `CommonAppendixImageContainer/img/insuranceRulesL_20230322.pdf`,
        mode: 'Prepend'
    }); }

    return appendix;

};
