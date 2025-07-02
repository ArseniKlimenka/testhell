'use strict';

const { finKnowledgeQuestionnaire, finKnowledgeQuestionnaire2023, finKnowledgeQuestionnaire2024 } = require('@config-rgsl/party/lib/partyQuestionnairesConstants');

const partyType = {
    Party: "Party", // Entity Type
    LegalEntity: "LegalEntity", // ЮЛ
    NaturalPerson: "NaturalPerson", // ФЛ
    SoleProprietor: "SoleProprietor" // ИП
};

// BFX_IMPL.DOCUMENT_TYPE
const partyDocumentType = {
    birthCertificate: "birthCertificate",
    driverID: "driverID",
    foreignBirthCertificate: "foreignBirthCertificate",
    foreignCitPassport: "foreignCitPassport",
    foreignTravelPassport: "foreignTravelPassport",
    incurredIdentityCard: "incurredIdentityCard",
    militaryID: "militaryID",
    passport: "passport",
    registrationCertificate: "registrationCertificate",
    registrationDocuments: "registrationDocuments",
    migrationCard: "migrationCard",
    otherDocument: "otherDocument",
    refugeeCertificate: "refugeeCertificate",
    refugeeID: "refugeeID",
    residence: "residence",
    temporaryResidencePermit: "temporaryResidencePermit",
    viza: "viza"
};

const partyIdentityDocumentType = [
    partyDocumentType.birthCertificate,
    partyDocumentType.driverID,
    partyDocumentType.foreignBirthCertificate,
    partyDocumentType.foreignCitPassport,
    partyDocumentType.foreignTravelPassport,
    partyDocumentType.incurredIdentityCard,
    partyDocumentType.militaryID,
    partyDocumentType.passport,
    partyDocumentType.registrationCertificate,
    partyDocumentType.registrationDocuments,
];

const partyResidenceDocumentType = [
    partyDocumentType.migrationCard,
    partyDocumentType.otherDocument,
    partyDocumentType.refugeeCertificate,
    partyDocumentType.refugeeID,
    partyDocumentType.residence,
    partyDocumentType.temporaryResidencePermit,
    partyDocumentType.viza
];

const partyDocumentTypes = [
    ...partyIdentityDocumentType,
    ...partyResidenceDocumentType
];

const generalData = {
    beneficiarItSelfCode: '1',
    executivePersonRelativeCode: '4',
};

const countryRussia = {
    countryShortName: 'РОССИЯ',
    countryCode: '643',
    countryFullName: 'Российская Федерация',
    alfa2: 'RU',
    alfa3: 'RUS'
};

const executivePersonNoPublicOfficial = {
    executivePersonDesc: 'Не является ПДЛ',
    executivePersonCode: '6'
};

const naturalPersonDefaultValue = {
    partyGeneralData: {
        isNonResident: false,
        registrationCountry: {
            countryShortName: "РОССИЯ",
            countryCode: "643",
            countryFullName: "Российская Федерация",
            alfa2: "RU",
            alfa3: "RUS"
        },
        taxResidence: {
            countryShortName: "РОССИЯ",
            countryCode: "643",
            countryFullName: "Российская Федерация",
            alfa2: "RU",
            alfa3: "RUS"
        },
        riskEstimation: 'Низкий',
        beneficiaryOwner: {
            beneficiaryOwnerDesc: 'Само Физическое Лицо',
            beneficiaryOwnerCode: '1'
        },
        relationGoal: "insurance",
        suggestedRelationType: "longTerm",
        financialState: "sustainable",
        businessReputation: "positive",
        goalOfFinancialActivity: {
            goalOfFinancialActivityDesc: "Деятельность с целью получения прибыли"
        },
        incomeSource: {
            incomeSourceDesc: "Доход от основной деятельности"
        }
    },
    partyPersonData: {
        isPublicOfficial: false,
        executivePerson: {
            executivePersonDesc: 'Не является ПДЛ',
            executivePersonCode: '6'
        },
        citizenship: []
    },
    partyRoleOfPerson: {},
    partyAddresses: [],
    partyDocuments: [],
    partyPhones: [],
    partyEmails: [],
    partyBankAccounts: [],
    finKnowledgeQuestionnaire: {
        questionnaire: finKnowledgeQuestionnaire
    },
    finKnowledgeQuestionnaire2023: {
        questionnaire: finKnowledgeQuestionnaire2023
    },
    finKnowledgeQuestionnaire2024: {
        questionnaire: finKnowledgeQuestionnaire2024
    }
};

const legalEntityDefaultValue = {
    partyGeneralData: {
        isNonResident: false,
        registrationCountry: {
            countryShortName: "РОССИЯ",
            countryCode: "643",
            countryFullName: "Российская Федерация",
            alfa2: "RU",
            alfa3: "RUS"
        },
        taxResidence: {
            countryShortName: "РОССИЯ",
            countryCode: "643",
            countryFullName: "Российская Федерация",
            alfa2: "RU",
            alfa3: "RUS"
        },
        riskEstimation: 'Низкий',
        relationGoal: "insurance",
        suggestedRelationType: "longTerm",
        financialState: "sustainable",
        businessReputation: "positive",
        goalOfFinancialActivity: {
            goalOfFinancialActivityDesc: "Деятельность с целью получения прибыли"
        },
        incomeSource: {
            incomeSourceDesc: "Доход от основной деятельности"
        }
    },
    partyAddresses: [],
    partyPhones: [],
    partyEmails: [],
    partyBankAccounts: []
};

const countryUSA = {
    countryShortName: 'СОЕДИНЕННЫЕ ШТАТЫ',
    countryCode: '840',
    countryFullName: 'Соединенные Штаты Америки',
    alfa2: 'US',
    alfa3: 'USA'
};

const foreignPerson = {
    foreignPassportDesc: 'Паспорт иностранного гражданина',
    russiaPassportDesc: 'Паспорт гражданина Российской Федерации'
};

const addressTypeLikeInUI = {
    registration: 'R',
    postal: 'P',
    fact: 'F',
};

const addressType = {
    registration: {
        code: 'R',
        description: 'Адрес регистрации'
    },
    postal: {
        code: 'P',
        description: 'Адрес корреспонденции'
    },
    fact: {
        code: 'F',
        description: 'Адрес фактический (проживания)'
    }
};

const modelData = {

    INN: '/partyGeneralData/INNKIO',
    isNonResident: '/partyGeneralData/isNonResident',
    registrationCountry: '/partyGeneralData/registrationCountry',
    TIN: '/partyGeneralData/TIN',
    lastName: '/partyPersonData/lastName',
    firstName: '/partyPersonData/firstName',
    middleName: '/partyPersonData/middleName',
    birthPlace: '/partyPersonData/birthPlace',
    countryPlace: '/partyPersonData/countryPlace',
    citizenship: '/partyPersonData/citizenship',
    dateOfBirth: '/partyPersonData/dateOfBirth',
    personGender: '/partyPersonData/personGender',
    SNILS: '/partyPersonData/SNILS',
    OGRNIP: '/partyPersonData/partyHistory',
    PartyDocuments: '/partyDocuments',
    PartyAddresses: '/partyAddresses',
    PartyPhones: '/partyPhones',
    PartyEmails: '/partyEmails',
    PartyBankAccounts: '/partyBankAccounts',
    PartyAddressesFull: '/PartyAddressesFull',
    PartyDocumentsPassportRussiaOrForeign: '/PartyDocumentsPassportRussiaOrForeign',
    PartyPhonesMobile: '/PartyPhonesMobile',
    PartyShortOrgName: '/partyOrganisationData/shortOrgName',
    PartyTradingPartnerCode: '/partyGeneralData/tradingPartnerCode',
    KPP: '/partyOrganisationData/KPP',
    PersonSite: '/partyPersonData/site/hasWebsite',
    PersonLicenses: '/partyPersonData/partyLicensesAdditionalInfo/hasLicenses',
    PartySite: '/partyOrganisationData/site/hasWebsite',
    PartyLicenses: '/partyLicensesAdditionalInfo/hasLicenses',
    beneficiaryOwnerQuestionnaire: '/beneficiaryOwnerQuestionnaire',
    beneficiaryOwner: '/partyGeneralData/beneficiaryOwner',
};

const viewType = {
    NaturalPerson: "NaturalPersonBasicEdit",
    LegalEntity: "LegalEntityBasicEdit"
};

const actor = {
    PartyEditor: "PartyEditor",
    RiskManager: "RiskManager",
    PartyViewer: "PartyViewer"
};

const gender = {
    Male: "Male",
    Female: "Female"
};

const beneficiaryOwnerCode = {
    NaturalPersonHimself: "1",
    OtherNaturalPerson: "2",
    OrganizationalStructure: "3",
    SoleExecutiveBody: "4",
};

const documentIssueDateDummy = '2099-01-01';

module.exports = {
    partyType,
    partyDocumentType,
    partyDocumentTypes,
    partyIdentityDocumentType,
    partyResidenceDocumentType,
    generalData,
    countryRussia,
    executivePersonNoPublicOfficial,
    naturalPersonDefaultValue,
    legalEntityDefaultValue,
    countryUSA,
    foreignPerson,
    addressTypeLikeInUI,
    addressType,
    modelData,
    viewType,
    actor,
    gender,
    beneficiaryOwnerCode,
    documentIssueDateDummy
};
