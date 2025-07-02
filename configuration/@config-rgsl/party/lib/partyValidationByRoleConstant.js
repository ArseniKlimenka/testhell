const { modelData } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = {
    /*
    * Place when required fields are set, used model of data in party constant
    */
    PolicyHolderNaturalPerson: {
        code: '/policyHolder',
        array: [
            modelData.birthPlace,
            modelData.countryPlace,
            modelData.citizenship,
            modelData.dateOfBirth,
            modelData.personGender,
            modelData.PartyDocuments,
            modelData.PartyAddresses,
            modelData.PartyPhones,
            modelData.PartyEmails,
            modelData.PersonSite,
            modelData.PersonLicenses,
        ],
    },

    InsuredNaturalPerson: {
        code: '/insuredPerson',
        array: [
            modelData.birthPlace,
            modelData.countryPlace,
            modelData.citizenship,
            modelData.dateOfBirth,
            modelData.personGender,
            modelData.PartyDocuments,
            modelData.PartyAddresses,
            modelData.PartyPhones,
            modelData.PartyEmails,
        ]
    },

    BeneficiaryNaturalPerson: {
        code: '/beneficiary',
        array: [
            modelData.birthPlace,
            modelData.countryPlace,
            modelData.citizenship,
            modelData.dateOfBirth,
            modelData.personGender,
            modelData.PartyDocuments,
            modelData.PartyAddresses,
            modelData.PartyPhones,
            modelData.PartyEmails,
            modelData.PersonSite,
            modelData.PersonLicenses,
        ],
    },

    BeneficiaryRepresentativeNaturalPerson: {
        code: '/beneficiaryRepresentative',
        array: [
            modelData.birthPlace,
            modelData.countryPlace,
            modelData.citizenship,
            modelData.dateOfBirth,
            modelData.personGender,
            modelData.PartyDocuments,
            modelData.PartyAddresses,
            modelData.PartyPhones,
            modelData.PartyEmails,
            modelData.PersonSite,
            modelData.PersonLicenses,
        ],
    },

    BeneficiaryOwnerNaturalPerson: {
        code: '/beneficiaryOwner',
        array: [
            modelData.birthPlace,
            modelData.countryPlace,
            modelData.citizenship,
            modelData.dateOfBirth,
            modelData.personGender,
            modelData.PartyDocuments,
            modelData.PartyAddresses,
            modelData.PartyEmails,
            modelData.PersonSite,
            modelData.PersonLicenses,
            modelData.beneficiaryOwnerQuestionnaire
        ],
    },

    ApplicantNaturalPerson: {
        code: '/applicantNaturalPerson',
        array: [
            modelData.firstName,
            modelData.lastName,
            modelData.middleName,
            modelData.personGender,
            modelData.dateOfBirth,
            modelData.birthPlace,
            modelData.countryPlace,
            modelData.SNILS,
            modelData.citizenship,
            modelData.PartyAddressesFull,
            modelData.PartyPhonesMobile,
            modelData.PartyEmails
        ],
    },

    TaxPayer: {
        code: '/taxPayer',
        array: [
            modelData.firstName,
            modelData.lastName,
            modelData.middleName,
            modelData.dateOfBirth,
            modelData.PartyDocuments
        ],
    },

    AgentNaturalPerson: {
        code: '/agentNaturalPerson',
        array: [
            modelData.personGender,
            modelData.dateOfBirth,
            modelData.SNILS,
            modelData.INN,
            modelData.PartyAddressesFull,
            modelData.PartyDocumentsPassportRussiaOrForeign,
            modelData.PartyPhonesMobile,
            modelData.PartyEmails,
            modelData.PartyBankAccounts,
        ],
    },

    PolicyHolderLegalEntity: {
        code: '/policyHolderLegalEntity',
        array: [
            modelData.PartyShortOrgName,
            modelData.KPP,
            modelData.PartySite,
            modelData.PartyLicenses,
            modelData.PartyAddresses,
            modelData.PartyBankAccounts,
            modelData.beneficiaryOwner,
        ],
    },

    InsuredLegalEntity: {
        code: '/insuredPersonLegalEntity',
        array: [
            modelData.PartyShortOrgName,
            modelData.KPP,
            modelData.PartyAddresses,
            modelData.PartyBankAccounts,
        ]
    },

    AgentResidentLegalEntity: {
        code: '/agentLegalEntity',
        array: [
            modelData.PartyShortOrgName,
            modelData.PartyAddressesFull,
            modelData.PartyPhones,
            modelData.PartyEmails,
            modelData.PartyBankAccounts,
            modelData.PartyTradingPartnerCode
        ],
    },

    PolicyHolderBoxNaturalPerson: {
        code: '/policyHolderBox',
        array: [
            modelData.citizenship,
            modelData.dateOfBirth,
            modelData.PartyDocuments,
            modelData.PartyPhones,
            modelData.PartyEmails
        ],
    },

    InsuredBoxNaturalPerson: {
        code: '/insuredPersonBox',
        array: [
            modelData.citizenship,
            modelData.dateOfBirth,
            modelData.PartyDocuments
        ]
    },
};
