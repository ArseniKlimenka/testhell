'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');

module.exports = function mapping({
    id,
    configurationCodeName,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    versionToRevertToId,
    previousCommonBody,
    dimensions
}) {

    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const issueFormCode = getValue(body, 'issueForm.code.issueFormCode', '');
    const issueDate = commonBody.issueDate;
    const isEPolicy = issueFormCode == 'ePolicy';
    const skipMigrated = skipForMigrated(this.businessContext.rootData);
    const additionalServices = body.additionalServices;
    const documentStateCode = state;

    if (!isEPolicy || skipMigrated) {

        return;
    }

    const policyHolderFirstName = body?.policyHolder?.partyData?.partyBody?.partyPersonData?.firstName;
    const policyHolderMiddleName = body?.policyHolder?.partyData?.partyBody?.partyPersonData?.middleName;
    const productDescription = body?.mainInsuranceConditions?.insuranceProduct?.productDescription;
    const phoneNumber = body?.issueForm?.phoneNumber;
    const contractNumber = number;
    const ruleCode = body?.insuranceRules?.ruleCode;
    const ruleDescription = body?.insuranceRules?.ruleDescription;

    return {
        contractId: id,
        contractConfName: configurationCodeName,
        policyType: dimensions.productGroup,
        productCode: productCode,
        issueDate: issueDate,
        issueFormCode: issueFormCode,
        recipientAddress: body.issueForm.email,
        shouldSignAttachment: state !== 'Draft',
        additionalServices: additionalServices,
        documentStateCode: documentStateCode,
        policyHolderFirstName: policyHolderFirstName,
        policyHolderMiddleName: policyHolderMiddleName,
        productDescription: productDescription,
        phoneNumber: phoneNumber,
        contractNumber: contractNumber,
        ruleDescription: ruleDescription,
        ruleCode: ruleCode,

    };
};
