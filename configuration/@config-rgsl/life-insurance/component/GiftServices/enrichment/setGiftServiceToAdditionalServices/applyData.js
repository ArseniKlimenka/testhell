'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { businessRules } = require('@adinsure/runtime');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function applyData(input, dataSourceResponse) {

    const result = [];
    const body = this.businessContext.rootData;
    const isCollectivePolicy = this.businessContext.configurationCodeName == 'CollectiveLifeInsurancePolicy';

    if (!isCollectivePolicy) {

        const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
        const issueDate = body.basicConditions?.issueDate;
        const policyStartDate = body.policyTerms?.startDate;
        const policyEndDate = body.policyTerms?.endDate;
        const risks = body.risks ?? [];
        const giftServicesArr = Object.entries(lifeInsuranceConstants.giftServices).map(([k, v]) => (v));
        const giftServiceCodes = body.giftServices?.selectedGiftServices?.giftServiceCodes ?? [];

        if (productCode && issueDate && policyStartDate && policyEndDate) {

            const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body.productConfiguration;

            productConf?.giftServices.forEach(function (serviceCode) {

                if (giftServicesArr.includes(serviceCode) && giftServiceCodes[0] == serviceCode) {

                    const additionalServicesConfiguration = businessRules.getRuleByVersion('AdditionalServicesConfigurationRule', 1).rule;
                    const giftServicesConfiguration = additionalServicesConfiguration({ serviceCode, productCode, issueDate }).result;

                    if (giftServicesConfiguration.requiredRisks.length == 0 ||
                        giftServicesConfiguration.requiredRisks.some(item => risks.some(element => element.risk.riskCode == item))) {

                        let calculatedEndDate = DateTimeUtils.addDays(policyEndDate, giftServicesConfiguration.endDateDiff);
                        if (([lifeInsuranceConstants.product.ECOFPVTB, lifeInsuranceConstants.product.ECOFVVTB].includes(productCode)
    && [lifeInsuranceConstants.giftServices.MED85, lifeInsuranceConstants.giftServices.FIN4].includes(serviceCode))
    || ((lifeInsuranceConstants.productGroupArray.STRATEGY_FOR_FIVE_VTB.includes(productCode)) && ([lifeInsuranceConstants.giftServices.MED85, lifeInsuranceConstants.giftServices.FIN4, lifeInsuranceConstants.giftServices.MED96, lifeInsuranceConstants.giftServices.MED97].includes(serviceCode)))) {
                            calculatedEndDate = DateTimeUtils.addMonthsSubstractDay(policyStartDate, 12);
                        }

                        result.push({
                            serviceCode: serviceCode,
                            serviceName: giftServicesConfiguration.serviceName,
                            startDate: DateTimeUtils.addDays(policyStartDate, giftServicesConfiguration.startDateDiff),
                            endDate: calculatedEndDate,
                            serviceParty: giftServicesConfiguration.serviceParty,
                            serviceFrequency: giftServicesConfiguration.serviceFrequency,
                            specialConditions: giftServicesConfiguration.specialConditions,
                            serviceTypeCode: giftServicesConfiguration.serviceTypeCode,
                            serviceType: giftServicesConfiguration.serviceType,
                            serviceSubTypeCode: giftServicesConfiguration.serviceSubTypeCode,
                            serviceSubType: giftServicesConfiguration.serviceSubType,
                            serviceAgreement: giftServicesConfiguration.serviceAgreement,
                            serviceStartDate: giftServicesConfiguration.serviceStartDate,
                            serviceEndDate: giftServicesConfiguration.serviceEndDate
                        });

                    }

                }

            });

        }

        let additionalServices = body.additionalServices;
        if (result.length > 0) {
            additionalServices = additionalServices.filter(i => !giftServicesArr.includes(i.serviceCode));
        }
        let allServices = [...additionalServices, ...result];
        if (!giftServiceCodes[0]) {
            allServices = allServices.filter(i => !giftServicesArr.includes(i.serviceCode));
        }

        body.additionalServices = allServices.filter((obj, index) => allServices.findIndex((item) => item.serviceCode === obj.serviceCode) === index);

    }

};
