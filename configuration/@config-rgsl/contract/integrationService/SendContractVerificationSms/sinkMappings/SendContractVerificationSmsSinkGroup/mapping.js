'use strict';

module.exports = function mapping(sinkResult, sinkExchange) {

    const policyHolderCode = sinkExchange.resolveContext('policyHolderCode');
    const phoneNumber = sinkExchange.resolveContext('phoneNumber');
    const issueDate = sinkExchange.resolveContext('issueDate');
    const contractNumber = sinkExchange.resolveContext('contractNumber');
    const isEPolicy = sinkExchange.resolveContext('isEPolicy');
    const partnerBusinessCode = sinkExchange.resolveContext('partnerBusinessCode');
    const documentStateCode = sinkExchange.resolveContext('documentStateCode');
    const policyHolderFirstName = sinkExchange.resolveContext('policyHolderFirstName');
    const policyHolderMiddleName = sinkExchange.resolveContext('policyHolderMiddleName');
    const productDescription = sinkExchange.resolveContext('productDescription');
    const productCode = sinkExchange.resolveContext('productCode');
    const ruleCode = sinkExchange.resolveContext('ruleCode');
    const ruleDescription = sinkExchange.resolveContext('ruleDescription');
    const sourceType = sinkExchange.resolveContext('sourceType');

    if (!isEPolicy) {

        return;
    }

    return {
        contractNumber: contractNumber,
        issueDate: issueDate,
        holderPartyCode: policyHolderCode,
        phoneNumber: phoneNumber,
        partnerBusinessCode: partnerBusinessCode,
        documentStateCode: documentStateCode,
        policyHolderFirstName: policyHolderFirstName,
        policyHolderMiddleName: policyHolderMiddleName,
        productDescription: productDescription,
        productCode: productCode,
        ruleCode: ruleCode,
        ruleDescription: ruleDescription,
        sourceType: sourceType
    };
};
