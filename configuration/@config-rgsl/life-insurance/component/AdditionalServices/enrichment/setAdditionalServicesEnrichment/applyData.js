'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { businessRules } = require('@adinsure/runtime');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { checkMinSumPremAdditionalService, filterServicesByCondition } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function applyData(input) {

    const result = [];
    const body = this.businessContext.rootData;
    const isCollectivePolicy = this.businessContext.configurationCodeName == 'CollectiveLifeInsurancePolicy';

    if (!isCollectivePolicy) {

        const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
        const issueDate = body.basicConditions?.issueDate;
        const policyStartDate = body.policyTerms?.startDate;
        const policyEndDate = body.policyTerms?.endDate;
        const risks = body.risks ?? [];

        if (productCode && issueDate && policyStartDate && policyEndDate) {

            const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body.productConfiguration;

            productConf?.additionalServices.forEach(function (serviceCode) {

                const giftServicesArr = Object.entries(lifeInsuranceConstants.giftServices).map(([k, v]) => (v));
                const skipGiftValid = productConf?.giftServices?.length == 0;

                if (!giftServicesArr.includes(serviceCode) || skipGiftValid) {

                    const additionalServicesConfiguration = businessRules.getRuleByVersion('AdditionalServicesConfigurationRule', 1).rule;
                    const additionalServiceConfiguration = additionalServicesConfiguration({ serviceCode, productCode, issueDate }).result;

                    if ((additionalServiceConfiguration?.requiredRisks?.length == 0 ||
                        additionalServiceConfiguration?.requiredRisks?.some(item => risks.some(element => element.risk.riskCode == item)))
                        &&
                        checkMinSumPremAdditionalService(body, additionalServiceConfiguration)
                    ) {

                        let calculatedStartDate = DateTimeUtils.addDays(policyStartDate, additionalServiceConfiguration.startDateDiff);
                        let calculatedEndDate = DateTimeUtils.addDays(policyEndDate, additionalServiceConfiguration.endDateDiff);
                        if ([product.TERMVVTB].includes(productCode) && risks.some(r => r.risk.riskCode == 'CDHR10800' || r.risk.riskCode == 'CDHW10800')) {
                            calculatedEndDate = risks.find(r => r.risk.riskCode == 'CDHR10800' || r.risk.riskCode == 'CDHW10800').endDate;
                        }
                        if ([product.ECOFPVTB, product.ECOFVVTB].includes(productCode)) {
                            if (['MED15'].includes(serviceCode)) {
                                calculatedStartDate = DateTimeUtils.addMonthsSubstractDay(policyStartDate, 3);
                                calculatedEndDate = risks.find(r => r.risk.riskCode == 'CDHR10800').endDate;
                            }
                        }
                        if ([product.ECATFPVTB, product.ECATFVVTB, product.ECATFUBRR].includes(productCode)) {
                            if (['MED88', 'MED89'].includes(serviceCode)) {
                                calculatedEndDate = DateTimeUtils.addMonthsSubstractDay(policyStartDate, 12);
                            }
                        }
                        if (['FIN5'].includes(serviceCode)) {
                            if (!printoutsHelper.checkTaxDeductionConditions(issueDate, productCode)) {
                                calculatedEndDate = DateTimeUtils.addMonthsSubstractDay(policyStartDate, 12);
                            }
                        }

                        result.push({
                            serviceCode: serviceCode,
                            serviceName: additionalServiceConfiguration.serviceName,
                            startDate: calculatedStartDate,
                            endDate: calculatedEndDate,
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

                    } else {
                        const serviceIndex = body.additionalServices.findIndex(item => item.serviceCode == serviceCode);
                        if (serviceIndex === 0 || serviceIndex > 0) {
                            body.additionalServices.splice(serviceIndex, 1);
                        }
                    }

                }

            });

        }

        let allServices = [...body.additionalServices, ...result];
        allServices = allServices.filter((obj, index) => allServices.findIndex((item) => item.serviceCode === obj.serviceCode) === index);
        body.additionalServices = filterServicesByCondition(body, allServices);

    }

};
