'use strict';

/**
 * @errorCode {errorCode} policyWasNotFoundInSystem
 * @errorCode {errorCode} emptyTaxPayerFullName
 * @errorCode {errorCode} accountingYearIsRequired
 */

module.exports = function validationAccountingCertificate(input) {

    const validationErrors = [];

    const documentNumber = this.businessContext.documentNumber;
    const dataPath = this.businessContext.dataPath;
    const contractNumber = input.contract?.number;
    const policyWasFound = input.technicalInformation?.policyWasFound;
    const taxPayerPartyCode = input.taxPayerData?.partyCode;

    if (contractNumber && !policyWasFound) {
        validationErrors.push({
            errorCode: "policyWasNotFoundInSystem",
            errorDataPath: dataPath + '/contract/number'
        });
    }

    if (documentNumber) {

        if (!taxPayerPartyCode) {
            validationErrors.push({
                errorCode: "emptyTaxPayerFullName",
                errorDataPath: dataPath + '/taxPayerData/partyFullName'
            });
        }
    }

    if (!input.accountingYear?.year) {
        validationErrors.push({
            errorCode: "accountingYearIsRequired",
            errorDataPath: dataPath + '/accountingYear/year'
        });
    }

    return validationErrors;

};
