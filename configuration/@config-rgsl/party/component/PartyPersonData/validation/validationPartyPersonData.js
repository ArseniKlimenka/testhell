const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');
const { generalData, executivePersonNoPublicOfficial } = require('@config-rgsl/party/lib/partyConstantsImpl');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

/**
* @errorCode {errorCode} isEmptyExecutivePerson
* @errorCode {errorCode} wrongExecutivePerson
* @errorCode {errorCode} wrongRegistrationCountry
* @errorCode {errorCode} isEmptyRelationType
* @errorCode {errorCode} isIncorrectBirthdayDate
* @errorCode {errorCode} isEmptyDateOfBirth
* @errorCode {errorCode} isEmptyPersonGender
* @errorCode {errorCode} wrongSNILS
* @errorCode {errorCode} isEmptySoleProprietorData
*/
module.exports = function validationPartyPersonData(input) {
    const validationErrors = [];

    const businessContext = this.businessContext;
    const dataPath = businessContext.dataPath;
    const actor = this.applicationContext.actor;
    const isPublicOfficial = input.isPublicOfficial;
    const executivePerson = input.executivePerson;
    const relationType = input.relationType;
    const dateOfBirth = input.dateOfBirth;
    const personGender = input.personGender;
    const SNILS = input.SNILS;
    const checkMarker = partyValidationHelper.checkValidationPersonData(businessContext);
    const naturalPersonCategory = input.naturalPersonCategory;
    const soleProprietorHistory = input.soleProprietorHistory ?? [];
    const partyRole = businessContext?.rootData?.data?.partyRoleOfPerson?.partyRole || businessContext?.rootData?.partyRoleOfPerson?.partyRole;
    const skipForBoxRoles = partyRole === configValidationByRole.PolicyHolderBoxNaturalPerson.code || partyRole === configValidationByRole.InsuredBoxNaturalPerson.code;

    if (actor == 'SkipValidationIS') { return validationErrors; }

    if (isPublicOfficial && !executivePerson) {
        validationErrors.push({
            errorCode: 'isEmptyExecutivePerson',
            errorDataPath: dataPath + '/executivePerson',
        });
    }

    if (isPublicOfficial && executivePerson &&
        (executivePerson.executivePersonCode === executivePersonNoPublicOfficial.executivePersonCode ||
            executivePerson.executivePersonDesc === executivePersonNoPublicOfficial.executivePersonDesc)) {
        validationErrors.push({
            errorCode: 'wrongExecutivePerson',
            errorDataPath: dataPath + '/executivePerson',
        });
    }

    if (executivePerson && executivePerson.executivePersonCode === generalData.executivePersonRelativeCode && !relationType) {
        validationErrors.push({
            errorCode: 'isEmptyRelationType',
            errorDataPath: dataPath + '/relationType',
        });
    }

    if (partyValidationHelper.checkPersonBirthday(dateOfBirth)) {
        validationErrors.push({
            errorCode: 'isIncorrectBirthdayDate',
            errorDataPath: dataPath + '/dateOfBirth',
        });
    }

    if (!dateOfBirth && actor != 'OrganisationAdministrator') {
        validationErrors.push({
            errorCode: 'isEmptyDateOfBirth',
            errorDataPath: dataPath + '/dateOfBirth',
        });
    }

    if (!personGender && actor != 'OrganisationAdministrator' && !skipForBoxRoles) {
        validationErrors.push({
            errorCode: 'isEmptyPersonGender',
            errorDataPath: dataPath + '/personGender',
        });
    }

    if (checkMarker && SNILS && partyValidationHelper.snilsValidation(SNILS) !== true) {
        validationErrors.push({
            errorCode: 'wrongSNILS',
            errorDataPath: dataPath + '/SNILS',
        });
    }

    if (naturalPersonCategory === 'soleProprietor' && soleProprietorHistory.length === 0) {
        validationErrors.push({
            errorCode: 'isEmptySoleProprietorData',
            errorDataPath: dataPath + '/soleProprietorHistory',
        });
    }

    partyValidationHelper.personNameValidation({ item: 'lastName', namePart: input.lastName, validationErrors: validationErrors, self: this });
    partyValidationHelper.personNameValidation({ item: 'firstName', namePart: input.firstName, validationErrors: validationErrors, self: this });
    partyValidationHelper.personNameValidation({ item: 'middleName', namePart: input.middleName, validationErrors: validationErrors, self: this });

    partyValidationHelper.personFullNameValidation({
        lastName: input.lastName,
        firstName: input.firstName,
        middleName: input.middleName,
        validationErrors,
        self: this
    });

    return validationErrors;
};
