'use strict';

const { clientIdToIncomingSourceMapping, originatingClientIds } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const data = sinkResult?.data;

    if (!data || data.length !== 1) {

        return;
    }

    const resultData = data[0].resultData;
    const body = resultData.body;
    const policyHolderCode = body.policyHolder.partyData.partyCode;
    const phoneNumber = body.issueForm.phoneNumber;
    const issueDate = body.basicConditions.issueDate;

    const issueFormCode = body?.issueForm?.code?.issueFormCode ?? '';
    const partnerBusinessCode = body?.mainInsuranceConditions?.partner?.partnerBusinessCode;
    const documentStateCode = resultData?.documentStateCode;
    const isEPolicy = issueFormCode == 'ePolicy';
    const policyHolderPersonData = body?.policyHolder?.partyData?.partyBody?.partyPersonData;
    const policyHolderFirstName = policyHolderPersonData?.firstName;
    const policyHolderMiddleName = policyHolderPersonData?.middleName;
    const insuranceProduct = body?.mainInsuranceConditions?.insuranceProduct;
    const productDescription = insuranceProduct?.productDescription;
    const productCode = insuranceProduct?.productCode;
    const ruleCode = body?.insuranceRules?.ruleCode;
    const ruleDescription = body?.insuranceRules?.ruleDescription;
    const originatingClientId = this.applicationContext?.originatingClientId ?? originatingClientIds.webClientVnext;
    const sourceType = clientIdToIncomingSourceMapping[originatingClientId];

    sinkExchange.mapContext('policyHolderCode', policyHolderCode);
    sinkExchange.mapContext('phoneNumber', phoneNumber);
    sinkExchange.mapContext('issueDate', issueDate);
    sinkExchange.mapContext('partnerBusinessCode', partnerBusinessCode);
    sinkExchange.mapContext('isEPolicy', isEPolicy);
    sinkExchange.mapContext('documentStateCode', documentStateCode);
    sinkExchange.mapContext('policyHolderFirstName', policyHolderFirstName);
    sinkExchange.mapContext('policyHolderMiddleName', policyHolderMiddleName);
    sinkExchange.mapContext('productDescription', productDescription);
    sinkExchange.mapContext('productCode', productCode);
    sinkExchange.mapContext('ruleCode', ruleCode);
    sinkExchange.mapContext('ruleDescription', ruleDescription);
    sinkExchange.mapContext('sourceType', sourceType);
};
