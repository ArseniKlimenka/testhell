const objectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');
const { modelData } = require('@config-rgsl/party/lib/partyConstantsImpl');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

/**
 * @description Checks for presence from the list
 * @param {String} role role in insurant bussines procces
 * @param {object} body data of Person
 * @param {array} validationErrors array will be fill if some info is absent
 * @returns {boolean} needed when called no Party segment
 * @errorCode {errorCode} noPassport
 * @errorCode {errorCode} noRegistrationAddress
 * @errorCode {errorCode} noFactAddress
 * @errorCode {errorCode} noPostalAddress
 * @errorCode {errorCode} noBirthPlace
 * @errorCode {errorCode} noCountryPlace
 * @errorCode {errorCode} noCitizenship
 * @errorCode {errorCode} isEmptyPhone
 * @errorCode {errorCode} isEmptySNILS
 * @errorCode {errorCode} isEmptyINN
 * @errorCode {errorCode} noActualRegistrationAddress
 * @errorCode {errorCode} cantCheckCompletenessRegistrationAddress
 * @errorCode {errorCode} noFullDataRegistrationAddress
 * @errorCode {errorCode} noPassportForAgent
 * @errorCode {errorCode} noActualPassport
 * @errorCode {errorCode} noPhonesForAgent
 * @errorCode {errorCode} isEmptyEmail
 * @errorCode {errorCode} isEmptyBankAccounts
 * @errorCode {errorCode} isEmptyShortOrgName
 * @errorCode {errorCode} isEmptyTradingPartnerCode
 * @errorCode {errorCode} isEmptyKPP
 * @errorCode {errorCode} isEmptySoleProprietorWebsite
 * @errorCode {errorCode} isEmptySoleProprietorLicenses
 * @errorCode {errorCode} isEmptyPartyWebsite
 * @errorCode {errorCode} isEmptyPartyLicenses
 * @errorCode {errorCode} isEmptyBeneficiaryOwnerQuestionnaire
 * @errorCode {errorCode} isEmptyBeneficiaryOwner
 */
function validationByRole(dataPath, role, body, validationErrors) {
    let arrayOfFields = [];
    if (!validationErrors) { validationErrors = []; }

    if (!body || objectUtils.isEmpty(body)) {
        return;
    }

    switch (role) {
        case configValidationByRole.PolicyHolderNaturalPerson.code:
            arrayOfFields = configValidationByRole.PolicyHolderNaturalPerson.array;
            break;
        case configValidationByRole.InsuredNaturalPerson.code:
            arrayOfFields = configValidationByRole.InsuredNaturalPerson.array;
            break;
        case configValidationByRole.BeneficiaryNaturalPerson.code:
            arrayOfFields = configValidationByRole.BeneficiaryNaturalPerson.array;
            break;
        case configValidationByRole.BeneficiaryRepresentativeNaturalPerson.code:
            arrayOfFields = configValidationByRole.BeneficiaryRepresentativeNaturalPerson.array;
            break;
        case configValidationByRole.BeneficiaryOwnerNaturalPerson.code:
            arrayOfFields = configValidationByRole.BeneficiaryOwnerNaturalPerson.array;
            break;
        case configValidationByRole.ApplicantNaturalPerson.code:
            arrayOfFields = configValidationByRole.ApplicantNaturalPerson.array;
            break;
        case configValidationByRole.TaxPayer.code:
            arrayOfFields = configValidationByRole.TaxPayer.array;
            break;
        case configValidationByRole.AgentNaturalPerson.code:
            arrayOfFields = configValidationByRole.AgentNaturalPerson.array;
            break;
        case configValidationByRole.PolicyHolderLegalEntity.code:
            arrayOfFields = configValidationByRole.PolicyHolderLegalEntity.array;
            break;
        case configValidationByRole.InsuredLegalEntity.code:
            arrayOfFields = configValidationByRole.InsuredLegalEntity.array;
            break;
        case configValidationByRole.AgentResidentLegalEntity.code:
            arrayOfFields = configValidationByRole.AgentResidentLegalEntity.array;
            break;
        case configValidationByRole.PolicyHolderBoxNaturalPerson.code:
            arrayOfFields = configValidationByRole.PolicyHolderBoxNaturalPerson.array;
            break;
        case configValidationByRole.InsuredBoxNaturalPerson.code:
            arrayOfFields = configValidationByRole.InsuredBoxNaturalPerson.array;
            break;
        default:
            break;
    }

    for (const element of arrayOfFields) {
        const fakeInput = getValue(body, element.replace(/\//, '').replace(/\//g, '.'));
        checkTriger(dataPath, element, fakeInput, validationErrors, body);
    }

    return validationErrors.length > 0;
}

/**
 * @description Checks fields in body. Depending on the trigger, the behavior is different
 * @param {String} triger addres of fields in body
 * @param {object || array || string} input data from fields
 * @param {array} validationErrors array will be fill if some info is absent
 */
function checkTriger(dataPath, triger, input, validationErrors, body) {
    switch (triger) {
        case modelData.PartyDocuments:
            partyValidationHelper.checkForPassport(input, validationErrors, dataPath + triger);
            break;
        case modelData.PartyAddresses:
            partyValidationHelper.checkForRegistrationAndPostal(input, validationErrors, dataPath + triger);
            break;
        case modelData.birthPlace:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'noBirthPlace');
            break;
        case modelData.countryPlace:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'noCountryPlace');
            break;
        case modelData.citizenship:
            partyValidationHelper.checkNoCitizenship(body, validationErrors, dataPath + triger);
            break;
        case modelData.dateOfBirth:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyDateOfBirth');
            break;
        case modelData.personGender:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyPersonGender');
            break;
        case modelData.PartyPhones:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyPhone');
            break;
        case modelData.SNILS:
            partyValidationHelper.checkIsSNILS(body, validationErrors, dataPath + triger);
            break;
        case modelData.INN:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyINN');
            break;
        case modelData.PartyAddressesFull:
            partyValidationHelper.checkIsFullAddresses(body, validationErrors);
            break;
        case modelData.PartyDocumentsPassportRussiaOrForeign:
            partyValidationHelper.checkIsPassportRussianOrForeign(body, validationErrors);
            break;
        case modelData.PartyPhonesMobile:
            partyValidationHelper.checkIsMobilePhones(body, validationErrors);
            break;
        case modelData.PartyEmails:
            partyValidationHelper.checkIsEmails(body, validationErrors, dataPath + triger);
            break;
        case modelData.PartyBankAccounts:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyBankAccounts');
            break;
        case modelData.PartyShortOrgName:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyShortOrgName');
            break;
        case modelData.PartyTradingPartnerCode:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyTradingPartnerCode');
            break;
        case modelData.KPP:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyKPP');
            break;
        case modelData.PersonSite:
            partyValidationHelper.checkIsSoleProprietorSite(body, validationErrors, dataPath + triger);
            break;
        case modelData.PartySite:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyPartyWebsite');
            break;
        case modelData.PersonLicenses:
            partyValidationHelper.checkIsSoleProprietorLicenses(body, validationErrors, dataPath + triger);
            break;
        case modelData.PartyLicenses:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyPartyLicenses');
            break;
        case modelData.beneficiaryOwnerQuestionnaire:
            partyValidationHelper.checkBeneficiaryOwnerQuestionnaire(body, validationErrors);
            break;
        case modelData.beneficiaryOwner:
            partyValidationHelper.checkIsEmptyField(input, validationErrors, dataPath + triger, 'isEmptyBeneficiaryOwner');
            break;
        default:
            break;
    }
}

module.exports = {
    validationByRole,
    checkTriger
};
