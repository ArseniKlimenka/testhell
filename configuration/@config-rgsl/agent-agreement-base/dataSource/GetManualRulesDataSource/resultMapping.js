'use strict';

const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};
    output.manualRule = nullCheck(input.MANUAL_RULE);
    output.product = nullCheck(input.PRODUCT);
    output.manualRuleDescription = nullCheck(input.MANUAL_RULE_DESCRIPTION);

    return output;

};
