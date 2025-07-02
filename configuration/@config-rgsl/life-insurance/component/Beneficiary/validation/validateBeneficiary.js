'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { checkPersonBirthday } = require('@config-rgsl/party/lib/partyValidationHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

/**
* @errorCode {errorCode} dobBeneficiary
* @errorCode {errorCode} dobBeneficiaryEmpty
* @errorCode {errorCode} personGender
* @errorCode {errorCode} shareEmpty
* @errorCode {errorCode} relationTypeEmpty
* @errorCode {errorCode} shareBeneficiaryNonAdult
* @errorCode {errorCode} dobBeneficiaryNonAdult
*/

module.exports = function validateBeneficiary(input, ambientProperties) {

    const validationErrors = [];

    const contractType = this.businessContext.configurationDimensions.contractType;
    const productGroup = this.businessContext.configurationDimensions.productGroup;

    const productCode = this.businessContext?.rootData?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const excludeValidationForProducts = [
        ...productGroupArray.RHE,
        ...productGroupArray.GENCHK,
        ...productGroupArray.MEDPRO
    ].includes(productCode);

    const dateOfBirth = getValue(input, 'dateOfBirth');
    const personGender = getValue(input, 'personGender');
    const share = getValue(input, 'share');
    const relationType = getValue(input, 'relationType');
    const rootData = this.businessContext.rootData;
    const issueDate = rootData?.basicConditions?.issueDate;
    const beneficiaryCategory = input.beneficiaryCategory;
    const beneficiaryAge = DateTimeUtils.getYearDifference(dateOfBirth, issueDate);

    const currentActor = this.applicationContext.actor;
    const isOperationsActor =
        currentActor === lifeInsuranceConstants.actor.Operations ||
        currentActor === lifeInsuranceConstants.actor.OperationsDirector;
    const documentType = this.businessContext?.configurationDimensions?.contractType;
    const typeQuote = [lifeInsuranceConstants.contractType.Quote].includes(documentType);
    const typePolicyDraft = [lifeInsuranceConstants.policyState.Draft].includes(this.businessContext.documentState) && [lifeInsuranceConstants.contractType.Policy].includes(documentType);
    const operuAdultEnable = isOperationsActor && (typeQuote || typePolicyDraft);
    const ECATF = lifeInsuranceConstants.productGroupArray.ECATF.includes(productCode);

    if (contractType === lifeInsuranceConstants.contractType.Quote) {
        if (dateOfBirth && checkPersonBirthday(dateOfBirth)) {
            validationErrors.push({
                errorCode: "dobBeneficiary",
                errorDataPath: '/dateOfBirth'
            });
        }

        if (!share && !excludeValidationForProducts) {
            validationErrors.push({
                errorCode: "shareEmpty",
                errorDataPath: '/share',
            });
        }
        if (!relationType && !excludeValidationForProducts) {
            validationErrors.push({
                errorCode: "relationTypeEmpty",
                errorDataPath: '/relationType',
            });
        }
    }

    if (!dateOfBirth) {
        validationErrors.push({
            errorCode: "dobBeneficiaryEmpty",
            errorDataPath: '/dateOfBirth',
            severity: isOperationsActor && productGroup !== lifeInsuranceConstants.productGroup.DMS.descriptionRU ? "Warning" : "Error"
        });
    }

    if (beneficiaryCategory == "NonAdult" && share != 1 && !ECATF) {
        validationErrors.push({
            errorCode: "shareBeneficiaryNonAdult",
            errorDataPath: '/share'
        });
    }

    if (beneficiaryCategory == "NonAdult" && share != 1 && ECATF && (operuAdultEnable || !isOperationsActor)) {
        validationErrors.push({
            errorCode: "shareBeneficiaryNonAdult",
            errorDataPath: '/share'
        });
    }

    if (beneficiaryCategory == "NonAdult" && beneficiaryAge >= 18) {
        validationErrors.push({
            errorCode: "dobBeneficiaryNonAdult",
            errorDataPath: '/dateOfBirth'
        });
    }

    return validationErrors;

};
