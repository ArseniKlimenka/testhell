const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutHelper = require('@config-rgsl/party/lib/partyTranslationHistoryHelper');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function (input) {

    const entityCode = this.businessContext.entityCode;
    const body = input.body;
    const patryExcludedPersons = (body.partyExcludedPersons?.map(_ => _.excludedPersonName))?.join();
    const naturalPersonCardCreationDate = dateUtils.formatDate(new Date(this.businessContext.entityCreatedOn), dateUtils.DateFormats.CALENDAR);
    const lastUpdateDate = dateUtils.formatDate(body.partyGeneralData?.lastUpdateDate, dateUtils.DateFormats.CALENDAR);
    const finKnowledgeLastUpdateDate = dateUtils.formatDate(body.finKnowledgeQuestionnaire2024?.lastUpdateDate, dateUtils.DateFormats.CALENDAR);
    const documentCreationDate = dateUtils.newDateAsString('dd.MM.yyyy');
    const gender = printoutHelper.translations[body.partyPersonData?.personGender];
    const relationGoal = printoutHelper.translations[body.partyGeneralData?.relationGoal];
    const suggestedRelationType = printoutHelper.translations[body.partyGeneralData?.suggestedRelationType];
    const financialState = printoutHelper.translations[body.partyGeneralData?.financialState];
    const businessReputation = printoutHelper.translations[body.partyGeneralData?.businessReputation];
    const naturalPersonCategory = printoutHelper.translations[body.partyPersonData?.naturalPersonCategory];
    const citizenship = extractCountryName(body?.partyPersonData?.citizenship[0]);
    const birthplace = extractCountryName(body?.partyPersonData?.countryPlace);
    const registrationCountry = extractCountryName(body?.partyGeneralData?.registrationCountry);
    const residencyCountry = extractCountryName(body?.partyGeneralData?.taxResidence);
    const partyRole = printoutHelper.translations[body.partyRoleOfPerson?.partyRole];

    const partyPhones = deepCopy(body.partyPhones ?? []);
    partyPhones.forEach(_ => {
        _.isPreferable = printoutHelper.translations[_.isPreferable];
        _.isForNewsletters = printoutHelper.translations[_.isForNewsletters];
        _.isNonActual = printoutHelper.translations[_.isNonActual];
    });

    const partyEmails = deepCopy(body.partyEmails ?? []);
    partyEmails.forEach(_ => {
        _.isPreferable = printoutHelper.translations[_.isPreferable];
        _.isForNewsletters = printoutHelper.translations[_.isForNewsletters];
    });

    const noEmail = body?.partyEmailsAdditionalInfo?.noEmail;

    const soleProprietorHistory = deepCopy(body.partyPersonData?.soleProprietorHistory ?? []);
    soleProprietorHistory.forEach(_ => {
        _.partyOGRN.dateOfStateRegistration = dateUtils.formatDate(_.partyOGRN.dateOfStateRegistration, dateUtils.DateFormats.CALENDAR);
        _.partyOGRN.dateOfRecordingTermination = dateUtils.formatDate(_.partyOGRN.dateOfRecordingTermination, dateUtils.DateFormats.CALENDAR);
    });

    const dateOfBirth = dateUtils.formatDate(body.partyPersonData?.dateOfBirth, dateUtils.DateFormats.CALENDAR);

    const partyLicenses = deepCopy(body.partyPersonData?.partyLicenses ?? []);
    partyLicenses.forEach(_ => _.dateOfIssueOfLicense = dateUtils.formatDate(_.dateOfIssueOfLicense, dateUtils.DateFormats.CALENDAR));

    const partyDocuments = deepCopy(body.partyDocuments ?? []);
    partyDocuments.forEach(_ => {
        _.issueDate = dateUtils.formatDate(_.issueDate, dateUtils.DateFormats.CALENDAR);
        _.expireDate = dateUtils.formatDate(_.expireDate, dateUtils.DateFormats.CALENDAR);
    });
    const actualPassport = partyDocuments.find(element => element.docType.docTypeCode === 'passport');
    const issuerName = actualPassport?.issuerName;
    const issuerCode = actualPassport?.issuerCode;

    const partyBankAccounts = deepCopy(body.partyBankAccounts ?? []);
    partyBankAccounts.forEach(_ => {
        _.openingDate = dateUtils.formatDate(_.openingDate, dateUtils.DateFormats.CALENDAR);
        _.closingDate = dateUtils.formatDate(_.closingDate, dateUtils.DateFormats.CALENDAR);
    });

    const partyTaxResidencies = deepCopy(body.partyTaxResidencies ?? []);
    partyTaxResidencies.forEach(_ => {
        _.startDate = dateUtils.formatDate(_.startDate, dateUtils.DateFormats.CALENDAR);
        _.endDate = dateUtils.formatDate(_.endDate, dateUtils.DateFormats.CALENDAR);
    });

    const partyAddresses = deepCopy(body.partyAddresses ?? []);
    partyAddresses.forEach(_ => {
        _.actualFrom = dateUtils.formatDate(_.actualFrom, dateUtils.DateFormats.CALENDAR);
        _.actualTo = dateUtils.formatDate(_.actualTo, dateUtils.DateFormats.CALENDAR);
    });

    return {
        body, entityCode, patryExcludedPersons, naturalPersonCardCreationDate, documentCreationDate,
        gender, relationGoal, suggestedRelationType, financialState, businessReputation,
        naturalPersonCategory, citizenship, partyRole, partyPhones, partyEmails, dateOfBirth, soleProprietorHistory,
        partyLicenses, partyDocuments, partyBankAccounts, partyTaxResidencies, partyAddresses, lastUpdateDate,
        finKnowledgeLastUpdateDate, issuerName, issuerCode, birthplace, registrationCountry, residencyCountry, noEmail
    };
};

const extractCountryName = function (input) {
    let country = '';

    if (input) {
        country = input?.countryFullName ?? input?.countryShortName;
    }

    return country;
};


