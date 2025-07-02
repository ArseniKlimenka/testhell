'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const data = sinkResult?.data;

    if (!data || data.length !== 1) {

        return;
    }

    const resultData = data[0].resultData;
    const body = resultData.body;

    const contractId = resultData.contractId;
    const configurationName = resultData.configurationName;
    const dimensions = resultData.dimensions;
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const issueDate = body.basicConditions.issueDate;

    const email = body.issueForm.email;

    const issueFormCode = body?.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';
    const additionalServices = body?.additionalServices;
    const partnerBusinessCode = body?.mainInsuranceConditions?.partner?.partnerBusinessCode;
    const documentStateCode = resultData?.documentStateCode;
    const policyHolderFirstName = body?.policyHolder?.partyData?.partyBody?.partyPersonData?.firstName;
    const policyHolderMiddleName = body?.policyHolder?.partyData?.partyBody?.partyPersonData?.middleName;
    const productDescription = body?.mainInsuranceConditions?.insuranceProduct?.productDescription;
    const phoneNumber = body?.issueForm?.phoneNumber;
    const contractNumber = resultData?.contractNumber;
    const ruleCode = body?.insuranceRules?.ruleCode;
    const ruleDescription = body?.insuranceRules?.ruleDescription;

    sinkExchange.mapContext('contractId', contractId);
    sinkExchange.mapContext('configurationName', configurationName);
    sinkExchange.mapContext('dimensions', dimensions);
    sinkExchange.mapContext('productCode', productCode);
    sinkExchange.mapContext('issueDate', issueDate);
    sinkExchange.mapContext('recipientEmail', email);
    sinkExchange.mapContext('isEPolicy', isEPolicy);
    sinkExchange.mapContext('issueFormCode', issueFormCode);
    sinkExchange.mapContext('additionalServices', additionalServices);
    sinkExchange.mapContext('partnerBusinessCode', partnerBusinessCode);
    sinkExchange.mapContext('documentStateCode', documentStateCode);
    sinkExchange.mapContext('policyHolderFirstName', policyHolderFirstName);
    sinkExchange.mapContext('policyHolderMiddleName', policyHolderMiddleName);
    sinkExchange.mapContext('productDescription', productDescription);
    sinkExchange.mapContext('phoneNumber', phoneNumber);
    sinkExchange.mapContext('contractNumber', contractNumber);
    sinkExchange.mapContext('ruleCode', ruleCode);
    sinkExchange.mapContext('ruleDescription', ruleDescription);

};
