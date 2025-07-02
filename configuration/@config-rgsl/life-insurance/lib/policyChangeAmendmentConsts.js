
const changeTypes = {
    insuredSumAndPaymentEdit: "insuredSumAndPaymentEdit",
    insuranceTermEdit: "insuranceTermEdit",
    riskEdit: "riskEdit",
    paymentPeriodTypeEdit: "paymentPeriodTypeEdit",
    reduction: "reduction",
    noteEdit: "noteEdit",
    allowPaymentStateChange: "allowPaymentStateChange",
    policyHolderChange: "policyHolderChange",
    financialVacations: "financialVacations",
    removeOrAddInsuredPerson: "removeOrAddInsuredPerson",
    policyHolderPersonalDataEdit: "policyHolderPersonalDataEdit",
    insuredPersonPersonalDataEdit: "insuredPersonPersonalDataEdit",
    beneficiaryEdit: "beneficiaryEdit",
    beneficiarySelection: "beneficiarySelection",
    paymentGraceDateProlongation: "paymentGraceDateProlongation",
    commissionRateEdit: "commissionRateEdit",
    investmentParametersEdit: "investmentParametersEdit",
    didPayment: "didPayment",
    additionalIncome: "additionalIncome",
    citizenship: "citizenship"
};

const personalDataChangeTypes = {
    correspondenceAddress: "correspondenceAddress",
    actualAddress: "actualAddress",
    registrationAddress: "registrationAddress",
    email: "email",
    dateOfBirth: "dateOfBirth",
    placeOfBirth: "placeOfBirth",
    passport: "passport",
    gender: "gender",
    fullName: "fullName",
    phone: "phone",
    sitizenship: "sitizenship"
};

const personalDataChangePropertiesDataExtracor = {
    fullName: {
        fullNameValue: (obj) => obj?.partyData?.partyFullName,
        lastNameValue: (obj) => obj?.partyData?.partyBody?.partyPersonData?.lastName,
        firstNameValue: (obj) => obj?.partyData?.partyBody?.partyPersonData?.firstName,
        middleNameValue: (obj) => obj?.partyData?.partyBody?.partyPersonData?.middleName
    },
    gender: {
        genderFirstValue: (obj) => obj?.partyData?.personGender,
        genderSecondValue: (obj) => obj?.partyData?.partyBody?.partyPersonData?.personGender
    },
    dateOfBirth: {
        dateOfBirthFirstValue: (obj) => obj?.partyData?.dateOfBirth,
        dateOfBirthSecondValue: (obj) => obj?.partyData?.partyBody?.partyPersonData?.dateOfBirth
    },
    placeOfBirth: {
        birthPlaceValue: (obj) => obj?.partyData?.partyBody?.partyPersonData?.birthPlace
    },
    email: {
        emailValue: (obj) => obj?.partyData?.partyBody?.partyEmails
    },
    phone: {
        phoneValue: (obj) => obj?.partyData?.partyBody?.partyPhones
    },
    passport: {
        passportValue: (obj) => (obj?.partyData?.partyBody?.partyDocuments ?? []).filter(d => d.docType.docTypeClass === 'identity')
    },
    actualAddress: {
        actualAddressValue: (obj) => (obj?.partyData?.partyBody?.partyAddresses ?? [])
            .find(a => a.addressType.addressTypeCode === addressTypeLikeInUI.fact)?.fullAddress?.value
    },
    correspondenceAddress: {
        actualAddressValue: (obj) => (obj?.partyData?.partyBody?.partyAddresses ?? [])
            .find(a => a.addressType.addressTypeCode === addressTypeLikeInUI.postal)?.fullAddress?.value
    },
    registrationAddress: {
        actualAddressValue: (obj) => (obj?.partyData?.partyBody?.partyAddresses ?? [])
            .find(a => a.addressType.addressTypeCode === addressTypeLikeInUI.registration)?.fullAddress?.value
    },
    sitizenship: {
        sitizenshipValue: (obj) => obj?.partyData?.partyBody?.partyPersonData?.citizenship
    }
};

const compliencePropertiesDataExtractor = {
    registrationAddress: (obj) => obj?.isForeignAddress,
    sitizenship: (obj) => obj?.isHolderSitizenshipChanged || obj?.isInsuredSitizenshipChanged,
    phone: (obj) => obj?.isForeignPhone,
    taxResidence: (obj) => obj?.isTaxResidenceChanged,
    registrationCountry: (obj) => obj?.isRegistrationCountryChanged
};

const compliencePropertyTranslations = {
    registrationAddress: "адреса",
    sitizenship: "гражданства",
    phone: "телефона",
    taxResidence: "Страны налогового резидентства",
    registrationCountry: "Страны Регистрации"
};

const finChangeTypes = [
    changeTypes.insuredSumAndPaymentEdit,
    changeTypes.insuranceTermEdit,
    changeTypes.riskEdit,
    changeTypes.paymentPeriodTypeEdit,
    changeTypes.reduction,
    changeTypes.noteEdit,
    changeTypes.allowPaymentStateChange,
    changeTypes.policyHolderChange,
    changeTypes.financialVacations,
    changeTypes.removeOrAddInsuredPerson,
    changeTypes.didPayment,
    changeTypes.additionalIncome
];

const nonFinChangeTypes = [
    changeTypes.policyHolderPersonalDataEdit,
    changeTypes.insuredPersonPersonalDataEdit,
    changeTypes.beneficiaryEdit,
    changeTypes.beneficiarySelection,
    changeTypes.paymentGraceDateProlongation,
    changeTypes.investmentParametersEdit,
    changeTypes.citizenship
];

const nonFinChangeTypesForChangeClass = [
    changeTypes.policyHolderPersonalDataEdit,
    changeTypes.insuredPersonPersonalDataEdit,
    changeTypes.beneficiaryEdit
];

const investmentParametersEditClassTypes = [
    changeTypes.investmentParametersEdit
];

const didPaymentClassTypes = [
    changeTypes.didPayment
];

const additionalIncomeClassTypes = [
    changeTypes.additionalIncome
];

const policyHolderChangeTypes = [
    changeTypes.policyHolderChange
];

const equityLifeChangeTypes = [
    changeTypes.didPayment,
    changeTypes.additionalIncome
];

const changeAmendmentTypes = {
    financialChange: "FinancialChange",
    nonFinancialChange: "NonFinancialChange",
    portfolioMovement: "PortfolioMovement"
};

const finChangeConfNames = [
    "AccumulatedLifeInsuranceFinChange",
    "CreditLifeInsuranceFinChange",
    "InvestmentLifeInsuranceFinChange",
    "RiskLifeInsuranceFinChange",
    "MedLifeInsuranceFinChange"];

const addressTypeLikeInUI = {
    registration: 'R',
    postal: 'P',
    fact: 'F',
};

module.exports = {
    changeTypes,
    finChangeTypes,
    nonFinChangeTypes,
    nonFinChangeTypesForChangeClass,
    investmentParametersEditClassTypes,
    didPaymentClassTypes,
    additionalIncomeClassTypes,
    policyHolderChangeTypes,
    changeAmendmentTypes,
    personalDataChangeTypes,
    finChangeConfNames,
    personalDataChangePropertiesDataExtracor,
    compliencePropertiesDataExtractor,
    compliencePropertyTranslations,
    equityLifeChangeTypes
};
