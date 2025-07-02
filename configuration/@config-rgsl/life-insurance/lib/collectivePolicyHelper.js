"use strict";

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { insuranceRulesConfiguration } = require('@config-rgsl/life-insurance/lib/insuranceRulesConfiguration');
const { changeRuleCode } = require('@config-rgsl/life-insurance/lib/insuranceRulesHelper');

function calcEndDate(input, ambientProperties) {

    if (ambientProperties.configurationCodeName != 'CollectiveLifeInsurancePolicy') { return; }

    const body = input.context.Body;
    const withTarification = body.basicConditions?.withTarification ?? false;
    const insuranceTerms = parseInt(body.basicConditions?.insuranceTerms ?? "0");
    const startDate = body.policyTerms?.startDate;

    if (!withTarification) { body.policyTerms.endDate = undefined; }

    if (withTarification && insuranceTerms > 0 && startDate) { body.policyTerms.endDate = DateTimeUtils.addDays(DateTimeUtils.addYears(startDate, insuranceTerms), -1); }
}

function copyInsuranceRulesToClientViewModel(productConf, productCode, creditProgramId) {

    const insuranceRules = [];

    let ruleCodes = productConf?.ruleCode ?? [];
    if (!Array.isArray(ruleCodes)) {
        ruleCodes = [ruleCodes];
    }

    ruleCodes.forEach(ruleCode => {

        changeRuleCode(ruleCode, productCode, creditProgramId);

        const rule = insuranceRulesConfiguration({ ruleCode });
        if (rule) {
            rule.ruleCode = ruleCode;
            delete rule.ruleLink;
        }
        insuranceRules.push(rule);
    });

    return insuranceRules;
}

async function copyAdditionalServicesToClientViewModel(body, productConf, ambientProperties) {

    const additionalServices = [];

    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions?.issueDate;
    const policyStartDate = body.policyTerms?.startDate;
    const policyEndDate = body.policyTerms?.endDate;
    const risks = body.risks ?? [];

    if (productCode && issueDate && policyStartDate && policyEndDate) {

        for (const serviceCode of productConf.additionalServices) {

            const request = {
                method: 'post',
                url: 'api/core/shared/business-rules/AdditionalServicesConfigurationRule/1',
                data: {
                    serviceCode: serviceCode,
                    productCode: productCode,
                    issueDate: issueDate
                },
            };

            const result = await ambientProperties.services.api.call(request);
            const additionalServiceConfiguration = result.data;

            if (additionalServiceConfiguration.requiredRisks.length == 0 ||
                additionalServiceConfiguration.requiredRisks.some(item => risks.some(element => element.risk.riskCode == item))) {

                additionalServices.push({
                    serviceCode: serviceCode,
                    serviceName: additionalServiceConfiguration.serviceName,
                    startDate: DateTimeUtils.addDays(policyStartDate, additionalServiceConfiguration.startDateDiff),
                    endDate: DateTimeUtils.addDays(policyEndDate, additionalServiceConfiguration.endDateDiff),
                    serviceParty: additionalServiceConfiguration.serviceParty,
                    serviceFrequency: additionalServiceConfiguration.serviceFrequency,
                    specialConditions: additionalServiceConfiguration.specialConditions,
                    serviceTypeCode: additionalServiceConfiguration.serviceTypeCode,
                    serviceType: additionalServiceConfiguration.serviceType,
                    serviceSubTypeCode: additionalServiceConfiguration.serviceSubTypeCode,
                    serviceSubType: additionalServiceConfiguration.serviceSubType,
                    serviceAgreement: additionalServiceConfiguration.serviceAgreement,
                    serviceStartDate: additionalServiceConfiguration.serviceStartDate,
                    serviceEndDate: additionalServiceConfiguration.serviceEndDate
                });
            }
        }
    }

    return additionalServices;
}

module.exports = {
    calcEndDate,
    copyInsuranceRulesToClientViewModel,
    copyAdditionalServicesToClientViewModel
};
