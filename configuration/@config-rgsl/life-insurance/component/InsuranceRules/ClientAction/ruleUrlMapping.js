const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { insuranceRulesConfiguration } = require('@config-rgsl/life-insurance/lib/insuranceRulesConfiguration');

module.exports = function ruleUrlMapping(input) {

    const ruleCode = getValue(input, 'componentContext.ruleCode');
    if (!ruleCode) { return; }

    const ruleConf = insuranceRulesConfiguration({ ruleCode }) || {};
    const ruleLink = ruleConf.ruleLink;
    if (!ruleLink) { return; }

    return ruleLink;

};
