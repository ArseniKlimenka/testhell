'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { documentIssueDateDummy } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function partyMapping({
    code,
    body,
    commonBody,
    applicationUserId,
    configurationCodeName
}) {

    const fullName = getValue(commonBody, 'fullName', null);
    const lastName = getValue(commonBody, 'lastName', null);
    const firstName = getValue(commonBody, 'firstName', null);
    const dateOfBirth = getValue(commonBody, 'dateOfBirth', null);
    const middleName = getValue(commonBody, 'attributes.middleName', null);
    const OGRNOGRNIP = getValue(commonBody, 'attributes.OGRNOGRNIP', null);
    const shortName = getValue(commonBody, 'attributes.shortOrgName', null);
    const naturalPersonCategory = getValue(body, 'partyPersonData.naturalPersonCategory', null);
    const isNonResident = getValue(body, 'partyGeneralData.isNonResident', null);
    const INNKIO = getValue(body, 'partyGeneralData.INNKIO', null);
    const registrationCountryAlfa2 = getValue(body, 'partyGeneralData.registrationCountry.alfa2', null);
    const registrationCountryCode = getValue(body, 'partyGeneralData.registrationCountry.countryCode', null);
    const SNILS = getValue(body, 'partyPersonData.SNILS', null);
    const TIN = getValue(body, 'partyGeneralData.TIN', null);
    const tradingPartnerCode = getValue(body, 'partyGeneralData.tradingPartnerCode', null);
    const bankruptcyProcedure = getValue(body, 'partyOrganisationData.bankruptcyProcedure', null);
    const licenseRevoked = getValue(body, 'partyOrganisationData.licenseRevoked', null);
    const unfulfilledObligationByGuarantee = getValue(body, 'partyOrganisationData.unfulfilledObligationByGuarantee', null);
    const unfulfilledObligationCB = getValue(body, 'partyOrganisationData.unfulfilledObligationCB', null);

    const isMigrated = getValue(commonBody, 'attributes.isMigrated', false);
    const addressNumberSAPAliceR = getValue(commonBody, 'attributes.addressNumberSAPAliceR', null);
    const addressNumberSAPAliceF = getValue(commonBody, 'attributes.addressNumberSAPAliceF', null);
    const addressNumberSAPAliceP = getValue(commonBody, 'attributes.addressNumberSAPAliceP', null);
    const partnerNumberSAPAlice = getValue(commonBody, 'attributes.partnerNumberSAPAlice', null);
    const nonResidentCode = getValue(commonBody, 'attributes.nonResidentCode', null);
    const duplicateMasterNumber = getValue(commonBody, 'attributes.duplicateMasterNumber', null);
    const isNotificationSent = commonBody.partyGeneralData?.isNotificationSent ?? null;

    const party = {};

    party['PTY_IMPL.PARTY_HUB'] = [
        {
            PARTY_CODE: code
        }
    ];

    party['PTY_IMPL.PARTY_INFO_SAT'] = [
        {
            PARTY_CODE: code,
            FULL_NAME: fullName,
            LAST_NAME: lastName,
            FIRST_NAME: firstName,
            DATE_OF_BIRTH: dateOfBirth,
            MIDDLE_NAME: middleName,
            OGRNOGRNIP: OGRNOGRNIP,
            SHORT_NAME: shortName,
            CONFIGURATION_CODE_NAME: configurationCodeName,
            NATURAL_PERSON_CATEGORY: naturalPersonCategory,
            IS_NON_RESIDENT: isNonResident,
            INNKIO: INNKIO,
            REGISTRATION_COUNTRY_ALFA2: registrationCountryAlfa2,
            REGISTRATION_COUNTRY_CODE: registrationCountryCode,
            SNILS: SNILS,
            TIN: TIN,
            TRADING_PARTNER_CODE: tradingPartnerCode,
            BANKRUPTCY_PROCEDURE: bankruptcyProcedure,
            LICENSE_REVOKED: licenseRevoked,
            UNFULFILLED_OBLIGATION_GU: unfulfilledObligationByGuarantee,
            UNFULFILLED_OBLIGATION_CB: unfulfilledObligationCB,
            IS_MIGRATED: isMigrated,
            ADDRES_NUMBER_SAPALICE_R: addressNumberSAPAliceR,
            ADDRES_NUMBER_SAPALICE_F: addressNumberSAPAliceF,
            ADDRES_NUMBER_SAPALICE_P: addressNumberSAPAliceP,
            PARTNER_NUMBER_SAPALICE: partnerNumberSAPAlice,
            NON_RESIDENT_CODE: nonResidentCode,
            DUPLICATE_MASTER_NUMBER: duplicateMasterNumber,
            IS_NOTIFICATION_SENT: isNotificationSent
        }
    ];

    party['PTY_IMPL.PARTY_ADDRESSES_SAT'] = [{
        $deleted: true,
        PARTY_CODE: code
    }];
    if (body.partyAddresses && body.partyAddresses.length > 0) {
        body.partyAddresses.map(address => {

            const addressTypeCode = getValue(address, 'addressType.addressTypeCode', null);
            const fullAddress = getValue(address, 'fullAddress.value', null);
            const actualFrom = getValue(address, 'actualFrom', DateTimeUtils.formatDate('1900-01-01'));
            const actualTo = getValue(address, 'actualTo', DateTimeUtils.formatDate('2999-12-31'));

            party['PTY_IMPL.PARTY_ADDRESSES_SAT'].push({
                PARTY_CODE: code,
                ADDRESS_TYPE_CODE: addressTypeCode,
                FULL_ADDRESS: fullAddress,
                ACTUAL_FROM: actualFrom,
                ACTUAL_TO: actualTo
            });

        });
    }

    party['PTY_IMPL.PARTY_DOCUMENTS_SAT'] = [{
        $deleted: true,
        PARTY_CODE: code
    }];
    if (body.partyDocuments && body.partyDocuments.length > 0) {
        body.partyDocuments.map(document => {

            const docTypeCode = document?.docType?.docTypeCode;
            const issueDate = document?.issueDate || documentIssueDateDummy;
            const expireDate = document?.expireDate;
            const docSeries = document?.docSeries;
            const docNumber = document?.docNumber;
            const issuerName = document?.issuerName;

            party['PTY_IMPL.PARTY_DOCUMENTS_SAT'].push({
                PARTY_CODE: code,
                DOC_TYPE_CODE: docTypeCode,
                ISSUE_DATE: issueDate,
                EXPIRE_DATE: expireDate,
                DOC_SERIES: docSeries,
                DOC_NUMBER: docNumber,
                ISSUER_NAME: issuerName
            });

        });
    }

    party['PTY_IMPL.PARTY_TAX_RESIDENCIES_SAT'] = [{
        $deleted: true,
        PARTY_CODE: code
    }];
    if (body.partyTaxResidencies && body.partyTaxResidencies.length > 0) {
        body.partyTaxResidencies.map(residency => {

            const residenceCountryCode = getValue(residency, 'residenceCountry.countryCode');
            const docTypeCode = getValue(residency, 'docType.docTypeCode');
            const startDate = getValue(residency, 'startDate');
            const endDate = getValue(residency, 'endDate');

            party['PTY_IMPL.PARTY_TAX_RESIDENCIES_SAT'].push({
                PARTY_CODE: code,
                RESIDENCE_COUNTRY_CODE: residenceCountryCode,
                DOC_TYPE_CODE: docTypeCode,
                START_DATE: startDate,
                END_DATE: endDate
            });

        });
    }

    party['PTY_IMPL.PARTY_PHONES_SAT'] = [{
        $deleted: true,
        PARTY_CODE: code
    }];
    if (body.partyPhones && body.partyPhones.length > 0) {

        let phoneId = 1;

        body.partyPhones.map(phone => {

            const countryCode = getValue(phone, 'countryCode.countryCode', null);
            const alfa2 = getValue(phone, 'countryCode.alfa2', null);
            const countryShortName = getValue(phone, 'countryCode.countryShortName', null);
            const countryPhoneCode = getValue(phone, 'countryCode.countryPhoneCode', null);
            const phoneTypeCode = getValue(phone, 'phoneType.phoneTypeCode', null);
            const phoneTypeDesc = getValue(phone, 'phoneType.phoneTypeDesc', null);
            const fullNumber = getValue(phone, 'fullNumber', null);
            const fullNumberFormatted = getValue(phone, 'fullNumberFormatted', null);
            const isPreferable = Boolean(getValue(phone, 'isPreferable'));
            const isAdditional = Boolean(getValue(phone, 'isAdditional'));
            const isNonActual = Boolean(getValue(phone, 'isNonActual'));
            const isForNewsletters = Boolean(getValue(phone, 'isForNewsletters'));
            const comments = getValue(phone, 'comments', null);

            party['PTY_IMPL.PARTY_PHONES_SAT'].push({
                PARTY_CODE: code,
                PHONE_ID: phoneId++,
                COUNTRY_CODE: countryCode,
                ALFA2: alfa2,
                COUNTRY_SHORT_NAME: countryShortName,
                COUNTRY_PHONE_CODE: countryPhoneCode,
                PHONE_TYPE_CODE: phoneTypeCode,
                PHONE_TYPE_DESC: phoneTypeDesc,
                FULL_NUMBER: fullNumber,
                FULL_NUMBER_FORMATTED: fullNumberFormatted,
                IS_PREFERABLE: isPreferable,
                IS_ADDITIONAL: isAdditional,
                IS_NON_ACTUAL: isNonActual,
                IS_FOR_NEWSLETTERS: isForNewsletters,
                COMMENTS: comments
            });

        });
    }

    party['PTY_IMPL.PARTY_EMAILS_SAT'] = [{
        $deleted: true,
        PARTY_CODE: code
    }];
    if (body.partyEmails && body.partyEmails.length > 0) {

        let emailId = 1;

        body.partyEmails.map(emailData => {

            const email = getValue(emailData, 'email', null);
            const isPreferable = Boolean(getValue(emailData, 'isPreferable'));
            const isForNewsletters = Boolean(getValue(emailData, 'isForNewsletters'));

            party['PTY_IMPL.PARTY_EMAILS_SAT'].push({
                PARTY_CODE: code,
                EMAIL_ID: emailId++,
                EMAIL: email,
                IS_PREFERABLE: isPreferable,
                IS_FOR_NEWSLETTERS: isForNewsletters
            });

        });
    }

    party['PTY_IMPL.PARTY_BANK_ACCOUNTS_SAT'] = [{
        $deleted: true,
        PARTY_CODE: code
    }];
    if (body.partyBankAccounts && body.partyBankAccounts.length > 0) {
        body.partyBankAccounts.map(bankAccount => {

            const number = getValue(bankAccount, 'number');
            const bankCorrespondentAccount = getValue(bankAccount, 'bankCorrespondentAccount');
            const bankBic = getValue(bankAccount, 'bankBic');
            const SWIFT = getValue(bankAccount, 'SWIFT');
            const IBAN = getValue(bankAccount, 'IBAN');
            const currencyCode = getValue(bankAccount, 'currency.currencyCode');
            const openingDate = getValue(bankAccount, 'openingDate');
            const closingDate = getValue(bankAccount, 'closingDate');
            const personalAccountNumber = bankAccount?.personalAccountNumber;

            party['PTY_IMPL.PARTY_BANK_ACCOUNTS_SAT'].push({
                PARTY_CODE: code,
                BANK_ACCOUNT: number,
                CORRESPONDENT_ACCOUNT: bankCorrespondentAccount,
                BICSWIFT: bankBic || SWIFT,
                BIC: bankBic,
                SWIFT: SWIFT,
                IBAN: IBAN,
                CURRENCY_CODE: currencyCode,
                OPENING_DATE: openingDate,
                CLOSING_DATE: closingDate,
                PERSONAL_ACCOUNT: personalAccountNumber
            });

        });
    }

    party['PTY_IMPL.PARTY_EXCLUDED_PERSONS_SAT'] = [{
        $deleted: true,
        PARTY_CODE: code
    }];
    if (body.partyExcludedPersons && body.partyExcludedPersons.length > 0) {

        let personId = 1;

        body.partyExcludedPersons.map(person => {

            const excludedPersonName = getValue(person, 'excludedPersonName', null);

            party['PTY_IMPL.PARTY_EXCLUDED_PERSONS_SAT'].push({
                PARTY_CODE: code,
                PERSON_ID: personId++,
                PERSON_NAME: excludedPersonName
            });

        });
    }

    party['PTY_IMPL.PARTY_LICENSE_SAT'] = [{
        $deleted: true,
        PARTY_CODE: code
    }];
    if (body.partyLicenses && body.partyLicenses.length > 0) {

        let licenseId = 1;

        body.partyLicenses.map(licenseData => {

            const licenseNumber = getValue(licenseData, 'licenseNumber', null);
            const licensingAuthority = getValue(licenseData, 'licensingAuthority');
            const dateOfIssueOfLicense = getValue(licenseData, 'dateOfIssueOfLicense');

            party['PTY_IMPL.PARTY_LICENSE_SAT'].push({
                PARTY_CODE: code,
                LICENSE_ID: licenseId++,
                LICENSE_NUMBER: licenseNumber,
                LICENSING_AUTHORITY: licensingAuthority,
                DATE_OF_ISSUE_OF_LICENSE: dateOfIssueOfLicense
            });

        });
    }

    return party;

};
