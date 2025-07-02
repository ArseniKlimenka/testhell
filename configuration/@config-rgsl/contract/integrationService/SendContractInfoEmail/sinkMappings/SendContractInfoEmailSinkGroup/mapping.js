'use strict';

module.exports = function mapping(sinkResult, sinkExchange) {

    const contractId = sinkExchange.resolveContext('contractId');
    const configurationName = sinkExchange.resolveContext('configurationName');
    const shouldSignAttachment = sinkExchange.resolveContext('shouldSignAttachment');
    const dimensions = sinkExchange.resolveContext('dimensions');
    const policyProductCode = sinkExchange.resolveContext('productCode');
    const policyissueDate = sinkExchange.resolveContext('issueDate');
    const email = sinkExchange.resolveContext('recipientEmail');
    const productGroupDimension = dimensions.find(item => item.Key === 'productGroup');
    const productGroup = productGroupDimension.Value;
    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = sinkExchange.resolveContext('isEPolicy');
    const additionalServices = sinkExchange.resolveContext('additionalServices');
    const documentStateCode = sinkExchange.resolveContext('documentStateCode');
    const policyHolderFirstName = sinkExchange.resolveContext('policyHolderFirstName');
    const policyHolderMiddleName = sinkExchange.resolveContext('policyHolderMiddleName');
    const productDescription = sinkExchange.resolveContext('productDescription');
    const phoneNumber = sinkExchange.resolveContext('phoneNumber');
    const contractNumber = sinkExchange.resolveContext('contractNumber');
    const ruleCode = sinkExchange.resolveContext('ruleCode');
    const ruleDescription = sinkExchange.resolveContext('ruleDescription');

    if (!isEPolicy) {

        return;
    }

    return {
        contractId: contractId,
        contractConfName: configurationName,
        policyType: productGroup,
        productCode: policyProductCode,
        issueDate: policyissueDate,
        recipientAddress: email,
        issueFormCode: issueFormCode,
        shouldSignAttachment: shouldSignAttachment,
        additionalServices: additionalServices,
        documentStateCode: documentStateCode,
        policyHolderFirstName: policyHolderFirstName,
        policyHolderMiddleName: policyHolderMiddleName,
        productDescription: productDescription,
        phoneNumber: phoneNumber,
        contractNumber: contractNumber,
        ruleCode: ruleCode,
        ruleDescription: ruleDescription
    };
};
