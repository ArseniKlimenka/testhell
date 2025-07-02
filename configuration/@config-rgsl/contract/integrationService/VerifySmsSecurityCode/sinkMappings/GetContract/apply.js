'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const data = getValue(sinkResult, 'data');

    if (!data || data.length !== 1) {

        return;
    }

    const resultData = data[0].resultData;
    const body = resultData.body;
    const policyHolderCode = body.policyHolder.partyData.partyCode;
    const partnerBusinessCode = getValue(body, 'mainInsuranceConditions.partner.partnerBusinessCode');
    const documentStateCode = getValue(resultData, 'documentStateCode');
    const phoneNumber = body.issueForm.phoneNumber;
    const issueDate = body.basicConditions.issueDate;
    const policyHolderPersonData = body?.policyHolder?.partyData?.partyBody?.partyPersonData;
    const policyHolderFirstName = policyHolderPersonData?.firstName;
    const policyHolderMiddleName = policyHolderPersonData?.middleName;
    const insuranceProduct = body?.mainInsuranceConditions?.insuranceProduct;
    const productDescription = insuranceProduct?.productDescription;
    const productCode = insuranceProduct?.productCode;
    const ruleCode = body?.insuranceRules?.ruleCode;
    const ruleDescription = body?.insuranceRules?.ruleDescription;

    sinkExchange.mapContext('policyHolderCode', policyHolderCode);
    sinkExchange.mapContext('phoneNumber', phoneNumber);
    sinkExchange.mapContext('issueDate', issueDate);
    sinkExchange.mapContext('partnerBusinessCode', partnerBusinessCode);
    sinkExchange.mapContext('documentStateCode', documentStateCode);
    sinkExchange.mapContext('policyHolderFirstName', policyHolderFirstName);
    sinkExchange.mapContext('policyHolderMiddleName', policyHolderMiddleName);
    sinkExchange.mapContext('productDescription', productDescription);
    sinkExchange.mapContext('productCode', productCode);
    sinkExchange.mapContext('ruleCode', ruleCode);
    sinkExchange.mapContext('ruleDescription', ruleDescription);

};
