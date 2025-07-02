'use strict';

const lifeConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { medLifeInsuranceQuoteDefaultValue } = require('@config-rgsl/med-life-insurance/lib/medLifeConstants');
const { productConfigurationFilter } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(integrationServiceInput, sinkExchange, additionalDataSourcesResults) {

    const policyContext = integrationServiceInput?.policyInput?.context;
    const productCode = integrationServiceInput?.productCode;
    const policyBody = policyContext?.Body;
    const issueDate = policyBody?.basicConditions?.issueDate ?? DateTimeUtils.newDateAsString();

    const productConfigurations = additionalDataSourcesResults?.GetProductConfigurationDataSource?.data?.map(i => i.resultData);
    const productConf = productConfigurationFilter(productConfigurations, false, productCode, issueDate);

    const fixedInsuredSumsValue =
        productConf.fixedInsuredSums &&
        productConf.fixedInsuredSums[1] &&
        productConf.fixedInsuredSums[1].any &&
        productConf.fixedInsuredSums[1].any[0] ? productConf.fixedInsuredSums[1].any[0] : undefined;
    const insuranceTermsValue =
        productConf.insuranceTerms &&
        productConf.insuranceTerms[0] ? productConf.insuranceTerms[0] : undefined;
    const body = medLifeInsuranceQuoteDefaultValue;
    body.policyHolder = policyBody.policyHolder;
    body.insuredPerson = policyBody.insuredPerson;
    body.technicalInformation.createdFromPolicyOriginal = policyBody.technicalInformation?.createdFromPolicy;
    body.technicalInformation.createdFromPolicy = policyContext.Number;
    body.mainInsuranceConditions.partner = {};
    body.mainInsuranceConditions.partner.partnerBusinessCode = policyBody.mainInsuranceConditions?.partner?.partnerBusinessCode;
    body.mainInsuranceConditions.partner.partnerCode = policyBody.mainInsuranceConditions?.partner?.partnerCode;
    body.mainInsuranceConditions.partner.partnerDescription = policyBody.mainInsuranceConditions?.partner?.partnerDescription;
    body.mainInsuranceConditions.partner.partnerShortDescription = policyBody.mainInsuranceConditions?.partner?.partnerShortDescription;
    body.mainInsuranceConditions.insuranceProduct = {};
    body.mainInsuranceConditions.insuranceProduct.productCode = productCode;
    body.mainInsuranceConditions.insuranceProduct.productDescription = productConf.productDescription;
    body.mainInsuranceConditions.insuranceProduct.productGroup = productConf.productGroupCode;
    body.basicConditions.issueDate = issueDate;
    body.basicConditions.fixedInsuredSums = fixedInsuredSumsValue ? [{ value: fixedInsuredSumsValue }] : [];
    body.basicConditions.riskInsuredSum = fixedInsuredSumsValue;
    body.basicConditions.insuranceTerms = insuranceTermsValue;
    body.issueForm.code = lifeConstants.issueForm[productConf.paperTypes[0]];
    body.initiator = sinkExchange.initiator;
    body.productConfiguration = productConf;

    return {
        body: body
    };

};
