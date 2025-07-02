'use strict';

const creditRisks = require('@config-rgsl/life-insurance/lib/creditRisks');
const { creditDmsSumInsured } = require('@config-rgsl/credit-life-insurance/lib/creditDmsSumInsured');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');

/**
* @errorCode {errorCode} creditProgramIsIncorrect
* @errorCode {errorCode} creditProgramIsIncorrectDMS
* @errorCode {errorCode} creditProgramIsIncorrectAge
* @errorCode {errorCode} creditProgramIdIsRequired
*/

module.exports = function validateCreditProgram(input, ambientProperties) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const creditSumNet = body?.creditContract?.creditSumNet;
    const creditProgramId = body?.creditProgram?.creditProgramId;
    const installmentAmount = body?.basicConditions?.riskPremium;
    const issueDate = body?.basicConditions?.issueDate;
    const endDate = body?.policyTerms?.endDate;
    const dateOfBirth = body?.policyHolder?.partyData?.partyBody?.partyPersonData?.dateOfBirth;
    const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate });
    const creditDmsSumInsuredConf = creditDmsSumInsured({ creditProgramId, installmentAmount });
    const skipMigrated = skipForMigrated(this.businessContext.rootData);

    if (productCode && creditSumNet && creditProgramId) {

        if (!creditRisksConfig) {
            validationErrors.push({
                errorCode: "creditProgramIsIncorrect",
                errorDataPath: dataPath + '/creditProgramId',
            });
        }
        else if (productCode == 'CDMS' && installmentAmount && !creditDmsSumInsuredConf) {
            validationErrors.push({
                errorCode: "creditProgramIsIncorrectDMS",
                errorDataPath: dataPath + '/creditProgramId',
            });
        }

    }

    if (dateOfBirth && issueDate && endDate && creditProgramId) {

        const ageOnIssueDate = DateTimeUtils.getYearDifference(dateOfBirth, issueDate);
        const ageOnEndDate = DateTimeUtils.getYearDifference(dateOfBirth, endDate);

        if (creditProgramId == 'РЖ27' && (ageOnIssueDate > 55 || ageOnEndDate > 60)) {
            validationErrors.push({
                errorCode: "creditProgramIsIncorrectAge",
                errorDataPath: dataPath + '/creditProgramId',
            });
        }

    }

    if (!creditProgramId && !skipMigrated) {
        validationErrors.push({
            errorCode: "creditProgramIdIsRequired",
            errorDataPath: dataPath + '/creditProgramId'
        });
    }

    return validationErrors;

};
