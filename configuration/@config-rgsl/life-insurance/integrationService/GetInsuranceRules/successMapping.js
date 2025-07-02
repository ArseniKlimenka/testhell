'use strict';

const { insuranceRulesConfiguration } = require('@config-rgsl/life-insurance/lib/insuranceRulesConfiguration');

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    const ruleCode = input.ruleCode;

    const ruleConf = insuranceRulesConfiguration({ ruleCode }) || {};
    const ruleDescription = ruleConf.ruleDescription;
    const ruleDate = ruleConf.ruleDate;
    const ruleLink = ruleConf.ruleLink;

    if (!ruleDescription && !ruleLink) {
        throw new Error('E: Подходящих результатов по вашему запросу не найдено.');
    }

    const result = {
        ruleDescription: ruleDescription,
        ruleDate: ruleDate,
        ruleLink: ruleLink
    };

    return result;

};
