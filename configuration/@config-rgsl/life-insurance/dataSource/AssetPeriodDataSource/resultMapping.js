module.exports = function resultMapping(input) {

    const output = {};

    const reservedForQuotesAssetUnitsCountBeginDate = input.reservedForQuotesAssetUnitsCountBeginDate ?? 0;
    const reservedForPoliciesAssetUnitsCountBeginDate = input.reservedForPoliciesAssetUnitsCountBeginDate ?? 0;
    const reservedForActivatedAssetUnitsCountBeginDate = input.reservedForActivatedAssetUnitsCountBeginDate ?? 0;
    const contractsInCooloffAssetUnitsCountBeginDate = input.contractsInCooloffAssetUnitsCountBeginDate ?? 0;
    const contractsNotInCooloffAssetUnitsCountBeginDate = input.contractsNotInCooloffAssetUnitsCountBeginDate ?? 0;

    const reservedForQuotesAssetUnitsCountEndDate = input.reservedForQuotesAssetUnitsCountEndDate ?? 0;
    const reservedForPoliciesAssetUnitsCountEndDate = input.reservedForPoliciesAssetUnitsCountEndDate ?? 0;
    const reservedForActivatedAssetUnitsCountEndDate = input.reservedForActivatedAssetUnitsCountEndDate ?? 0;
    const contractsInCooloffAssetUnitsCountEndDate = input.contractsInCooloffAssetUnitsCountEndDate ?? 0;
    const contractsNotInCooloffAssetUnitsCountEndDate = input.contractsNotInCooloffAssetUnitsCountEndDate ?? 0;

    const reservedForQuotesAssetUnitsCountChange = reservedForQuotesAssetUnitsCountEndDate - reservedForQuotesAssetUnitsCountBeginDate;
    const reservedForPoliciesAssetUnitsCountChange = reservedForPoliciesAssetUnitsCountEndDate - reservedForPoliciesAssetUnitsCountBeginDate;
    const reservedForActivatedAssetUnitsCountChange = reservedForActivatedAssetUnitsCountEndDate - reservedForActivatedAssetUnitsCountBeginDate;
    const contractsInCooloffAssetUnitsCountChange = contractsInCooloffAssetUnitsCountEndDate - contractsInCooloffAssetUnitsCountBeginDate;
    const contractsNotInCooloffAssetUnitsCountChange = contractsNotInCooloffAssetUnitsCountEndDate - contractsNotInCooloffAssetUnitsCountBeginDate;

    const originalDocumentNumber = input.ORIGINAL_DOCUMENT_NUMBER;
    const id_isin = input.ID_ISIN;

    output.id_isin = id_isin;
    output.originalDocumentNumber = originalDocumentNumber;
    output.reservedForQuotesAssetUnitsCountBeginDate = reservedForQuotesAssetUnitsCountBeginDate;
    output.reservedForPoliciesAssetUnitsCountBeginDate = reservedForPoliciesAssetUnitsCountBeginDate;
    output.issuedCountBeginDate = reservedForPoliciesAssetUnitsCountBeginDate + reservedForQuotesAssetUnitsCountBeginDate;
    output.reservedForActivatedAssetUnitsCountBeginDate = reservedForActivatedAssetUnitsCountBeginDate;
    output.contractsInCooloffAssetUnitsCountBeginDate = contractsInCooloffAssetUnitsCountBeginDate;
    output.contractsNotInCooloffAssetUnitsCountBeginDate = contractsNotInCooloffAssetUnitsCountBeginDate;

    output.reservedForQuotesAssetUnitsCountEndDate = reservedForQuotesAssetUnitsCountEndDate;
    output.reservedForPoliciesAssetUnitsCountEndDate = reservedForPoliciesAssetUnitsCountEndDate;
    output.issuedCountEndDate = reservedForPoliciesAssetUnitsCountEndDate + reservedForQuotesAssetUnitsCountEndDate;
    output.reservedForActivatedAssetUnitsCountEndDate = reservedForActivatedAssetUnitsCountEndDate;
    output.contractsInCooloffAssetUnitsCountEndDate = contractsInCooloffAssetUnitsCountEndDate;
    output.contractsNotInCooloffAssetUnitsCountEndDate = contractsNotInCooloffAssetUnitsCountEndDate;

    output.reservedForQuotesAssetUnitsCountChange = reservedForQuotesAssetUnitsCountChange;
    output.reservedForPoliciesAssetUnitsCountChange = reservedForPoliciesAssetUnitsCountChange;
    output.reservedForActivatedAssetUnitsCountChange = reservedForActivatedAssetUnitsCountChange;
    output.contractsInCooloffAssetUnitsCountChange = contractsInCooloffAssetUnitsCountChange;
    output.contractsNotInCooloffAssetUnitsCountChange = contractsNotInCooloffAssetUnitsCountChange;

    output.issuedCountChange = output.issuedCountEndDate - output.issuedCountBeginDate;

    output.beginDate = input.BEGIN_DATE;
    output.endDate = input.END_DATE;

    return output;
};
