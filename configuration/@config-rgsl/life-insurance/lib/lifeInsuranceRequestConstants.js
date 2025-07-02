module.exports = {

    documentStates: {
        Draft: 'Draft',
        OnReview: 'OnReview',
        Correction: 'Correction',
        Issued: 'Issued',
        CancelWithoutPayment: 'CancelWithoutPayment',
        RefusalToTerminateByPolicyholder: 'RefusalToTerminateByPolicyholder',
        Cancelled: 'Cancelled',
        CreateAmendment: 'CreateAmendment',
        CreateFinancialPolicyHolderChangeAmendment: 'CreateFinancialPolicyHolderChangeAmendment',
        CreateNonFinancialAmendment: 'CreateNonFinancialAmendment',
        CreateFinancialAmendment: 'CreateFinancialAmendment',
        AmendmentsCancelled: 'AmendmentsCancelled',
        AmendmentsCreated: 'AmendmentsCreated',
        Rejected: 'Rejected'
    },

    documentActors: {
        Agent: "Agent",
        GeneralBackOffice: "GeneralBackOffice",
        Operations: "Operations"
    },

    documentRoles: {
        SalesVTBMassGroup: "SalesVTBMassGroup",
        InvestmentParametersEditor: "InvestmentParametersEditor",
        GeneralBackOffice: "GeneralBackOffice",
        Operations: "Operations",
        BeneficiaryOwnerEdit: "BeneficiaryOwnerEdit"
    },

    typeOfRequest: {
        Cancellation: "Cancellation",
        Modification: "Modification"
    },

    initiator: {
        insurer: "insurer",
        applicant: "applicant"
    },

    documentConfiguration: {
        UniversalDocument: "UniversalDocument",
        UniversalDocumentTypeValue: "LifeInsuranceRequest"
    },

    documentActions: {
        CreateFinancialAmendment: "CreateFinancialAmendment",
        CreateNonFinancialAmendment: "CreateNonFinancialAmendment",
        CreateFinancialPolicyHolderChangeAmendment: "CreateFinancialPolicyHolderChangeAmendment"
    },

    documentTransitions: {
        CreateNonFinancialAmendment_to_CreateAmendment: "CreateNonFinancialAmendment_to_CreateAmendment",
        CreateFinancialAmendment_to_CreateAmendment: "CreateFinancialAmendment_to_CreateAmendment",
        CreateFinancialPolicyHolderChangeAmendment_to_CreateAmendment: "CreateFinancialPolicyHolderChangeAmendment_to_CreateAmendment",
        OnReview_to_CreateAmendment: "OnReview_to_CreateAmendment",
        CreateAmendment_to_CreateNonFinancialAmendment: "CreateAmendment_to_CreateNonFinancialAmendment",
    },

    paymentFrequencyCodes: {
        Single: "1", // Единовременно
        Yearly: "2", // Ежегодно
        HalfYearly: "3", // Раз в полгода
        Quarterly: "4", // Раз в квартал
        Monthly: "5" // Раз в месяц
    },

    applicantType: {
        policyHolder: "policyHolder",
        beneficiary: "beneficiary",
        beneficiaryRepresentative: "beneficiaryRepresentative"
    },

    reasonForRecipient: {
        insuredPerson: "insuredPerson",
        beneficiaryByEndowment: "beneficiaryByEndowment"
    }

};
