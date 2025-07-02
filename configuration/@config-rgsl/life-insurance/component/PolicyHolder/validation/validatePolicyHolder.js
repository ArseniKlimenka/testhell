'use strict';

const validationByRole = require('@config-rgsl/party/lib/partyValidationByRole');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');
const { finKnowledge2023ActualDate, finKnowledge2024ActualDate } = require('@config-rgsl/party/lib/partyQuestionnairesConstants');
const { partyType, countryRussia, countryUSA } = require('@config-rgsl/party/lib/partyConstantsImpl');
const { productGroupArray, product, paymentFrequency } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { RPFaddressType } = require('@config-rgsl/infrastructure/lib/AddressConstants');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

/**
* @errorCode {errorCode} isEmptyDataByPolicyHolder
* @errorCode {errorCode} policyHolderIsRequired
* @errorCode {errorCode} noFinKnowledgeQuestionnaire
* @errorCode {errorCode} noFinKnowledgeQuestionnaireConfirmation
* @errorCode {errorCode} noFinKnowledgeQuestionnaireLastUpdate
* @errorCode {errorCode} noFinKnowledgeQuestionnaire2023
* @errorCode {errorCode} noFinKnowledgeQuestionnaireConfirmation2023
* @errorCode {errorCode} noFinKnowledgeQuestionnaireLastUpdate2023
* @errorCode {errorCode} noFinKnowledgeQuestionnaire2024
* @errorCode {errorCode} noFinKnowledgeQuestionnaireConfirmation2024
* @errorCode {errorCode} noFinKnowledgeQuestionnaireLastUpdate2024
* @errorCode {errorCode} dateOfBirthEmpty
* @errorCode {errorCode} personGenderEmpty
* @errorCode {errorCode} policyHolderAge
* @errorCode {errorCode} policyHolderAgeMax
* @errorCode {errorCode} policyHolderAgeEndMax
* @errorCode {errorCode} policyHolderAgePaymentPeriodEndMax
* @errorCode {errorCode} policyHolderNotResident
* @errorCode {errorCode} policyHolderTaxResidenceNotRus
* @errorCode {errorCode} policyHolderNotRusCitizenship
* @errorCode {errorCode} policyHolderUSAPhone
* @errorCode {errorCode} policyHolderNotRusPhone
* @errorCode {errorCode} policyHolderForeignAddress
* @errorCode {errorCode} policyHolderPlaceUSA
* @errorCode {errorCode} policyHolderForeignCitPassport
* @errorCode {errorCode} policyHolderManualAddress
* @errorCode {errorCode} policyHolderStatelessPerson
*/
module.exports = function validatePolicyHolder(input, ambientProperties) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;

    const stateCode = this.businessContext.documentState;
    const contractType = this.businessContext.configurationDimensions.contractType;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const partyBody = input?.partyData?.partyBody;
    const partyCode = input?.partyData?.partyCode;
    const finKnowledgeQuestionnaire = input?.partyData?.partyBody?.finKnowledgeQuestionnaire?.questionnaire ?? [];
    const finKnowledgeQuestionnaireConfirmation = input?.partyData?.partyBody?.finKnowledgeQuestionnaire?.confirmation;
    const finKnowledgeQuestionnaireLastUpdate = input?.partyData?.partyBody?.finKnowledgeQuestionnaire?.lastUpdateDate;
    const finKnowledgeQuestionnaire2023 = input?.partyData?.partyBody?.finKnowledgeQuestionnaire2023?.questionnaire ?? [];
    const finKnowledgeQuestionnaireConfirmation2023 = input?.partyData?.partyBody?.finKnowledgeQuestionnaire2023?.confirmation;
    const finKnowledgeQuestionnaireLastUpdate2023 = input?.partyData?.partyBody?.finKnowledgeQuestionnaire2023?.lastUpdateDate;
    const finKnowledgeQuestionnaire2024 = input?.partyData?.partyBody?.finKnowledgeQuestionnaire2024?.questionnaire ?? [];
    const finKnowledgeQuestionnaireConfirmation2024 = input?.partyData?.partyBody?.finKnowledgeQuestionnaire2024?.confirmation;
    const finKnowledgeQuestionnaireLastUpdate2024 = input?.partyData?.partyBody?.finKnowledgeQuestionnaire2024?.lastUpdateDate;
    const paymentFrequencyCode = body.basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const dateOfBirth = input?.partyData?.dateOfBirth;
    const personGender = input?.partyData?.personGender;
    const issueDate = body.basicConditions?.issueDate;
    const productConf = body?.productConfiguration;
    const skipMigrated = skipForMigrated(this.businessContext.rootData);
    const contractEndDate = body?.policyTerms?.endDate;
    const isEFR = body?.technicalInformation?.apiSender == 'API_EFR';

    const isPolicyHolderLegalEntity = input?.partyData?.partyType == partyType.LegalEntity;
    const partyBodyPH = body?.policyHolder?.partyData?.partyBody;
    const isNotResident = partyBodyPH?.partyGeneralData?.isNonResident;
    const partyPhones = partyBodyPH?.partyPhones ?? [];
    const citizenship = partyBodyPH?.partyPersonData?.citizenship ?? [];
    const partyAddresses = partyBodyPH?.partyAddresses ?? [];
    const partyDocuments = partyBodyPH?.partyDocuments ?? [];
    const countryCode = partyBodyPH?.partyPersonData?.countryPlace?.countryCode;
    const taxCountryCode = partyBodyPH?.partyGeneralData?.taxResidence?.countryCode;
    const taxResidenceCountryNotRussia = typeof taxCountryCode === 'undefined' ? false : taxCountryCode != countryRussia.countryCode;
    const countryPlaceUSA = partyBodyPH?.partyPersonData?.countryPlace?.countryCode == countryUSA.countryCode;
    const existsUSAPhone = partyPhones?.some(item => item.countryCode && item.countryCode.countryCode == countryUSA.countryCode);
    const existsRussiaPhone = partyPhones?.some(item => item.countryCode && item.countryCode.countryCode == countryRussia.countryCode);
    const existsNonRussiaPhone = partyPhones?.some(item => item.countryCode && item.countryCode.countryCode != countryRussia.countryCode);
    const existsNonRussiaCitizenship = citizenship?.some(item => item.countryCode != countryRussia.countryCode);
    const existsForeignAddress = partyAddresses
        .filter(item => item.addressType && RPFaddressType.includes(item.addressType.addressTypeCode))
        ?.some(item => item.isForeignAddress);
    const existsManualAddress = partyAddresses
        ?.filter(item => item.addressType && RPFaddressType.includes(item.addressType.addressTypeCode))
        ?.some(item => item.isManualAddress);
    const existsForeignCitPassport = partyDocuments?.some(item => item.docType && item.docType.docTypeCode == 'foreignCitPassport');
    const isStatelessPerson = partyBodyPH?.partyPersonData?.isStatelessPerson;
    const policyHolderValidation = productGroupArray.POLICY_HOLDER_VALIDATION.includes(productCode);
    const partyRole = lifeInsuranceConstants.sportProducts.includes(productCode) ? configValidationByRole.PolicyHolderBoxNaturalPerson.code : dataPath;
    const skipForBoxRoles = partyRole === configValidationByRole.PolicyHolderBoxNaturalPerson.code;
    const paymentPeriodEndDate = body?.policyTerms?.paymentPeriodEndDate;
    const policyHolderAgePaymentPeriodEndMax = 80;

    if (!partyCode) {
        validationErrors.push({
            errorCode: "policyHolderIsRequired",
            errorDataPath: dataPath + '/partyData/partyFullName',
        });
    }
    if (policyHolderValidation) {
        if (isNotResident) {
            validationErrors.push({
                errorCode: "policyHolderNotResident"
            });
        }
        if (taxResidenceCountryNotRussia) {
            validationErrors.push({
                errorCode: "policyHolderTaxResidenceNotRus"
            });
        }
        if (existsNonRussiaCitizenship) {
            validationErrors.push({
                errorCode: "policyHolderNotRusCitizenship"
            });
        }
        if (existsUSAPhone) {
            validationErrors.push({
                errorCode: "policyHolderUSAPhone"
            });
        }
        if (!existsRussiaPhone && existsNonRussiaPhone) {
            validationErrors.push({
                errorCode: "policyHolderNotRusPhone"
            });
        }
        if (existsForeignAddress) {
            validationErrors.push({
                errorCode: "policyHolderForeignAddress"
            });
        }
        if (countryPlaceUSA) {
            validationErrors.push({
                errorCode: "policyHolderPlaceUSA"
            });
        }
        if (existsForeignCitPassport) {
            validationErrors.push({
                errorCode: "policyHolderForeignCitPassport"
            });
        }
        if (existsManualAddress) {
            validationErrors.push({
                errorCode: "policyHolderManualAddress"
            });
        }
        if (isStatelessPerson) {
            validationErrors.push({
                errorCode: "policyHolderStatelessPerson"
            });
        }
    }

    if (stateCode == lifeInsuranceConstants.quoteState.Draft && contractType == lifeInsuranceConstants.contractType.Quote) {
        if (partyCode && paymentFrequencyCode == lifeInsuranceConstants.paymentFrequency.oneTime.code && productConf.showFinKnowledgeQuestionnaire) {
            if (!isEFR) {

                const isFinKnowledgeQuestionnaireBefore2023 = DateTimeUtils.isBefore(
                    DateTimeUtils.formatDate(issueDate),
                    DateTimeUtils.formatDate(finKnowledge2023ActualDate));

                const isFinKnowledgeQuestionnaireBefore2024 = DateTimeUtils.isBefore(
                    DateTimeUtils.formatDate(issueDate),
                    DateTimeUtils.formatDate(finKnowledge2024ActualDate));

                const isFinKnowledgeQuestionnaireAfter2024 = DateTimeUtils.isAfterOrEqual(
                    DateTimeUtils.formatDate(issueDate),
                    DateTimeUtils.formatDate(finKnowledge2024ActualDate));

                if (isFinKnowledgeQuestionnaireBefore2023) {

                    const notExists = finKnowledgeQuestionnaire.length == 0;
                    const notAllAnswers = finKnowledgeQuestionnaire.some(item => item.itemConfirmation === undefined);
                    const allAnswersNo = finKnowledgeQuestionnaire.every(item => item.itemConfirmation === false);

                    if (notExists || notAllAnswers && !skipMigrated) {
                        validationErrors.push({
                            errorCode: 'noFinKnowledgeQuestionnaire',
                            errorDataPath: dataPath + '/partyData/partyFullName',
                        });
                    }
                    else {
                        if (allAnswersNo && !finKnowledgeQuestionnaireConfirmation) {
                            validationErrors.push({
                                errorCode: 'noFinKnowledgeQuestionnaireConfirmation',
                                errorDataPath: dataPath + '/partyData/partyFullName',
                            });
                        }
                        else {
                            if (DateTimeUtils.isBefore(finKnowledgeQuestionnaireLastUpdate, DateTimeUtils.addDays(DateTimeUtils.newDateAsString(), -3))) {
                                validationErrors.push({
                                    errorCode: 'noFinKnowledgeQuestionnaireLastUpdate',
                                    errorDataPath: dataPath + '/partyData/partyFullName',
                                });
                            }
                        }
                    }

                }
                else if (isFinKnowledgeQuestionnaireBefore2024) {

                    const notExists2023 = finKnowledgeQuestionnaire2023.length == 0;
                    const notAllAnswers2023 = finKnowledgeQuestionnaire2023.some(item => item.itemConfirmation === undefined);
                    const allAnswersNo2023 = finKnowledgeQuestionnaire2023.every(item => item.itemConfirmation === false);

                    if (notExists2023 || notAllAnswers2023 && !skipMigrated) {
                        validationErrors.push({
                            errorCode: 'noFinKnowledgeQuestionnaire2023',
                            errorDataPath: dataPath + '/partyData/partyFullName',
                        });
                    }
                    else {
                        if (allAnswersNo2023 && !finKnowledgeQuestionnaireConfirmation2023) {
                            validationErrors.push({
                                errorCode: 'noFinKnowledgeQuestionnaireConfirmation2023',
                                errorDataPath: dataPath + '/partyData/partyFullName',
                            });
                        }
                        else {
                            if (DateTimeUtils.isBefore(finKnowledgeQuestionnaireLastUpdate2023, DateTimeUtils.addDays(DateTimeUtils.newDateAsString(), -3))) {
                                validationErrors.push({
                                    errorCode: 'noFinKnowledgeQuestionnaireLastUpdate2023',
                                    errorDataPath: dataPath + '/partyData/partyFullName',
                                });
                            }
                        }
                    }
                }
                else if (isFinKnowledgeQuestionnaireAfter2024 && lifeInsuranceConstants.productGroupArray.PRODUCT_TO_CHECK_FIN_QUESTIONNAIRE.includes(productCode)) {

                    const notExists2024 = finKnowledgeQuestionnaire2024.length == 0;
                    const notAllAnswers2024 = finKnowledgeQuestionnaire2024.some(item => item.itemConfirmation === undefined);
                    const allAnswersNo2024 = finKnowledgeQuestionnaire2024.every(item => item.itemConfirmation === false);

                    if (notExists2024 || notAllAnswers2024 && !skipMigrated) {
                        validationErrors.push({
                            errorCode: 'noFinKnowledgeQuestionnaire2024',
                            errorDataPath: dataPath + '/partyData/partyFullName',
                        });
                    }
                    else {
                        if (allAnswersNo2024 && !finKnowledgeQuestionnaireConfirmation2024) {
                            validationErrors.push({
                                errorCode: 'noFinKnowledgeQuestionnaireConfirmation2024',
                                errorDataPath: dataPath + '/partyData/partyFullName',
                            });
                        }
                        else {
                            if (DateTimeUtils.isBefore(finKnowledgeQuestionnaireLastUpdate2024, DateTimeUtils.addDays(DateTimeUtils.newDateAsString(), -3))) {
                                validationErrors.push({
                                    errorCode: 'noFinKnowledgeQuestionnaireLastUpdate2024',
                                    errorDataPath: dataPath + '/partyData/partyFullName',
                                });
                            }
                        }
                    }

                }
            }
        }
    }

    if (isPolicyHolderLegalEntity) { return validationErrors; }

    if (partyCode && contractType == lifeInsuranceConstants.contractType.Quote && !skipMigrated) {
        if (validationByRole.validationByRole(dataPath, partyRole, partyBody)) {
            validationErrors.push({
                errorCode: "isEmptyDataByPolicyHolder",
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

    if (productCode && dateOfBirth && issueDate && DateTimeUtils.getYearDifference(dateOfBirth, issueDate) < productConf.holderAgeOnStartDateMin) {
        validationErrors.push({
            errorCode: "policyHolderAge",
            errorDataPath: dataPath + '/partyData/dateOfBirth',
            reference: {
                entity: {
                    policyHolderAgeMin: productConf.holderAgeOnStartDateMin
                }
            }
        });
    }

    const policyHolderAgeMax = productConf.holderAgeOnStartDateMaxMandatoryAgreement || productConf.holderAgeOnStartDateMax;
    if (productCode && dateOfBirth && issueDate && DateTimeUtils.getYearDifference(dateOfBirth, issueDate) > policyHolderAgeMax) {
        validationErrors.push({
            errorCode: "policyHolderAgeMax",
            errorDataPath: dataPath + '/partyData/dateOfBirth',
            reference: {
                entity: {
                    policyHolderAgeMax
                }
            }
        });
    }

    if (productCode && dateOfBirth && issueDate && DateTimeUtils.getYearDifference(dateOfBirth, contractEndDate) > productConf.holderAgeOnEndDateMax) {
        validationErrors.push({
            errorCode: "policyHolderAgeEndMax",
            errorDataPath: dataPath + '/partyData/dateOfBirth',
            reference: {
                entity: {
                    policyHolderAgeEndMax: productConf.holderAgeOnEndDateMax
                }
            }
        });
    }

    if (productCode && dateOfBirth && issueDate && paymentFrequencyCode
        && [product.WCEN3OAS].includes(productCode)
        && paymentFrequencyCode !== paymentFrequency.oneTime.code
        && DateTimeUtils.getYearDifference(dateOfBirth, paymentPeriodEndDate) > policyHolderAgePaymentPeriodEndMax) {
        validationErrors.push({
            errorCode: "policyHolderAgePaymentPeriodEndMax",
            errorDataPath: dataPath + '/partyData/dateOfBirth',
            reference: {
                entity: {
                    policyHolderAgePaymentPeriodEndMax
                }
            }
        });
    }


    return validationErrors;
};
