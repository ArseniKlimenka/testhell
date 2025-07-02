'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { businessRules } = require('@adinsure/runtime');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');
const { policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

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
    const isOffer = issueFormCode == 'offer';
    const issueDate = commonBody.issueDate;
    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;
    const skipMigrated = skipForMigrated(this.businessContext.rootData);
    const documentStateCode = state;

    if (!isOffer || !conf || state != policyState.Active || skipMigrated) {

        return;
    }

    return {
        contractId: id,
        contractConfName: configurationCodeName,
        policyType: dimensions.productGroup,
        productCode: productCode,
        issueDate: issueDate,
        recipientAddress: body.issueForm.email,
        shouldSignAttachment: state !== 'Draft',
        issueFormCode: issueFormCode,
        documentStateCode: documentStateCode
    };
};
