'use strict';

const validationByRole = require('@config-rgsl/party/lib/partyValidationByRole');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

/**
* @errorCode {errorCode} isEmptyDataByInsuredPerson
* @errorCode {errorCode} insuredPersonIsRequired
* @errorCode {errorCode} insuredPersonAge
* @errorCode {errorCode} dateOfBirthEmpty
* @errorCode {errorCode} personGenderEmpty
* @errorCode {errorCode} insuredPersonProMedAge
* @errorCode {errorCode} insuredMinPersonAge
*/
module.exports = function validateInsuredPerson(input, ambientProperties) {

    const validationErrors = [];
    const product = lifeInsuranceConstants.product;
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;
    const contractType = this.businessContext.configurationDimensions.contractType;
    const isPolicyHolder = this.businessContext.rootData?.insuredPerson?.isPolicyHolder;
    const isOperations = this.applicationContext.actor == lifeInsuranceConstants.actor.Operations;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const partyBody = input?.partyData?.partyBody;
    const partyCode = input?.partyData?.partyCode;
    const birthDate = partyBody?.partyPersonData?.dateOfBirth;
    const issueDate = body?.basicConditions?.issueDate;
    const contractStartDate = body?.policyTerms?.startDate;
    const contractEndDate = body?.policyTerms?.endDate;
    const ageOnIssueDate = dateUtils.getYearDifference(birthDate, issueDate);
    const ageOnStartDate = dateUtils.getYearDifference(birthDate, contractStartDate);
    const ageOnEndDate = dateUtils.getYearDifference(birthDate, dateUtils.addDays(contractEndDate, 1));
    const dateOfBirth = input?.partyData?.dateOfBirth;
    const personGender = input?.partyData?.personGender;
    const skipMigrated = skipForMigrated(this.businessContext.rootData);
    const issueForm = body?.issueForm?.code?.issueFormCode;
    const paperZenit = [product.IDG2ZENIT, product.IDG1ZENIT, product.IDG3ZENIT, product.IDG5ZENIT].includes(productCode)
        && issueForm == lifeInsuranceConstants.issueForm.paper.issueFormCode;
    const partyRole = lifeInsuranceConstants.sportProducts.includes(productCode) ? configValidationByRole.InsuredBoxNaturalPerson.code : dataPath;
    const skipForBoxRoles = partyRole === configValidationByRole.InsuredBoxNaturalPerson.code;
    const EBMGZENIT = [lifeInsuranceConstants.product.EBMGZENIT].includes(productCode) && issueForm == lifeInsuranceConstants.issueForm.ePolicy.issueFormCode;

    if (!partyCode) {
        validationErrors.push({
            errorCode: "insuredPersonIsRequired",
            errorDataPath: dataPath + '/partyData/partyFullName',
        });
    }

    if (productCode && issueDate && !paperZenit) {
        const paymentFrequencyCode = body?.basicConditions?.paymentFrequency?.paymentFrequencyCode;
        if (paymentFrequencyCode) {
            const productConf = body?.productConfiguration;
            const insuredAgeOnStartDateMin = productConf?.insuredAgeOnStartDateMin;
            let insuredAgeOnStartDateMax = (productConf?.insuredAgeOnStartDateMandatoryAgreement || (productConf?.insuredAgeOnStartDateMax && productConf?.insuredAgeOnStartDateMax[paymentFrequencyCode]));
            const insuredAgeOnEndDateMax = productConf?.insuredAgeOnEndDateMaxMandatoryAgreement ? productConf?.insuredAgeOnEndDateMaxMandatoryAgreement[paymentFrequencyCode] : (productConf?.insuredAgeOnEndDateMax && productConf?.insuredAgeOnEndDateMax[paymentFrequencyCode]);
            insuredAgeOnStartDateMax = EBMGZENIT ? (productConf?.insuredAgeOnStartDateMax && productConf?.insuredAgeOnStartDateMax[paymentFrequencyCode]) : insuredAgeOnStartDateMax;
            if (ageOnIssueDate < insuredAgeOnStartDateMin ||
                ageOnIssueDate > insuredAgeOnStartDateMax ||
                ageOnEndDate > insuredAgeOnEndDateMax) {
                validationErrors.push({
                    errorCode: "insuredPersonAge",
                    errorDataPath: dataPath + '/partyData/dateOfBirth',
                    reference: {
                        entity: {
                            insuredAgeMin: (insuredAgeOnStartDateMin ? 'Минимально допустимый возраст на дату заключения ' + insuredAgeOnStartDateMin + '.' : ''),
                            insuredAgeMax: (insuredAgeOnStartDateMax ? 'Максимально допустимый возраст на дату заключения ' + insuredAgeOnStartDateMax + '.' : ''),
                            insuredAgeOnEndDateMax: ((insuredAgeOnEndDateMax && insuredAgeOnEndDateMax != 120) ? 'Максимально допустимый возраст на дату окончания ' + insuredAgeOnEndDateMax + '.' : '')
                        }
                    }
                });
            }
        }
    }

    if (productCode && issueDate) {
        const paymentFrequencyCode = body?.basicConditions?.paymentFrequency?.paymentFrequencyCode;
        if (paymentFrequencyCode) {
            const productConf = body?.productConfiguration;
            const insuredAgeOnStartDateMin = productConf?.insuredAgeOnStartDateMin;
            if (ageOnIssueDate < insuredAgeOnStartDateMin) {
                validationErrors.push({
                    errorCode: "insuredMinPersonAge",
                    errorDataPath: dataPath + '/partyData/dateOfBirth',
                    reference: {
                        entity: {
                            insuredAgeMin: (insuredAgeOnStartDateMin ? 'Минимально допустимый возраст на дату заключения ' + insuredAgeOnStartDateMin + '.' : '')
                        }
                    }
                });
            }
        }
    }

    if (partyCode && contractType == lifeInsuranceConstants.contractType.Quote && !skipMigrated) {
        if (validationByRole.validationByRole(dataPath, partyRole, partyBody)) {
            validationErrors.push({
                errorCode: "isEmptyDataByInsuredPerson",
                errorDataPath: dataPath + '/partyData/partyFullName',
            });
        }
    }

    if (!dateOfBirth) {
        validationErrors.push({
            errorCode: "dateOfBirthEmpty",
            errorDataPath: dataPath + '/partyData/dateOfBirth',
        });
    }

    if (!personGender && !skipForBoxRoles) {
        validationErrors.push({
            errorCode: "personGenderEmpty",
            errorDataPath: dataPath + '/partyData/personGender',
        });
    }

    if (lifeInsuranceConstants.productGroupArray.MEDPRO.includes(productCode) && !isOperations && !isPolicyHolder && (ageOnIssueDate < 0 || ageOnIssueDate > 17)) {
        validationErrors.push({
            errorCode: "insuredPersonProMedAge",
            errorDataPath: dataPath + '/partyData/dateOfBirth',
        });
    }

    return validationErrors;
};
