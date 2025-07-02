'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    versionToRevertToId,
    previousCommonBody,
    dimensions
}) {

    const skipMigrated = skipForMigrated(this.businessContext.rootData);

    if (state !== 'Draft' || skipMigrated) {

        return;
    }

    const issueFormCode = getValue(body, 'issueForm.code.issueFormCode', '');
    const isEPolicy = issueFormCode == 'ePolicy';
    const partnerBusinessCode = getValue(body, 'mainInsuranceConditions.partner.partnerBusinessCode');

    if (!isEPolicy) {

        return;
    }

    const policyHolder = body.policyHolder.partyData;
    const documentStateCode = state;

    const policyHolderFirstName = body?.policyHolder?.partyData?.partyBody?.partyPersonData?.firstName;
    const policyHolderMiddleName = body?.policyHolder?.partyData?.partyBody?.partyPersonData?.middleName;
    const productDescription = body?.mainInsuranceConditions?.insuranceProduct?.productDescription;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    return {
        contractNumber: number,
        issueDate: body.basicConditions.issueDate,
        holderPartyCode: policyHolder.partyCode,
        phoneNumber: body.issueForm.phoneNumber,
        throwOnIntegrationError: false,
        partnerBusinessCode: partnerBusinessCode,
        documentStateCode: documentStateCode,
        policyHolderFirstName: policyHolderFirstName,
        policyHolderMiddleName: policyHolderMiddleName,
        productDescription: productDescription,
        productCode: productCode
    };
};

