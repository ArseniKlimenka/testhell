'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { insuranceRulesConfiguration } = require('@config-rgsl/life-insurance/lib/insuranceRulesConfiguration');
const { changeRuleCode } = require('@config-rgsl/life-insurance/lib/insuranceRulesHelper');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function applyData(input) {

    const body = this.businessContext.rootData;
    if (body.insuranceRules?.ruleCode) {
        return;
    }

    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    const issueDate = getValue(body, 'basicConditions.issueDate');
    if (!productCode || !issueDate) {
        body.insuranceRules = {};
        return;
    }

    const isCollectivePolicy = this.businessContext.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body.productConfiguration;
    const ruleCode = isCollectivePolicy ? productConf.ruleCode[0] : productConf.ruleCode;
    if (!ruleCode) {
        body.insuranceRules = {};
        return;
    }

    // ugly hardcode because of no config and time for config
    const creditProgramId = getValue(body, 'creditProgram.creditProgramId');
    changeRuleCode(ruleCode, productCode, creditProgramId);

    const ruleConf = insuranceRulesConfiguration({ ruleCode }) || {};
    const ruleDescription = ruleConf.ruleDescription;
    const ruleDate = ruleConf.ruleDate;

    if (!ruleDescription || !ruleDate) {
        body.insuranceRules = {};
        return;
    }

    body.insuranceRules.ruleCode = ruleCode;
    body.insuranceRules.ruleDescription = ruleDescription;
    body.insuranceRules.ruleDate = ruleDate;

};
