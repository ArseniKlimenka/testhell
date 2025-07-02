'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.reinsuranceRowId = input.REINSURANCE_ROW_ID;
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.contractNumber = input.CONTRACT_NUMBER;
    output.policyYearNumber = parseInt(input.POLICY_YEAR_NUMBER);
    output.reinsurerShare = input.REINSURER_SHARE;
    output.reinsurerCode = input.REINSURER_CODE;
    output.reinsuranceNumber = input.REINSURANCE_NUMBER;
    output.version = input.VERSION;
    output.fullName = input.FULL_NAME;
    output.serviceProviderCode = input.SERVICE_PROVIDER_CODE;

    return output;
};
