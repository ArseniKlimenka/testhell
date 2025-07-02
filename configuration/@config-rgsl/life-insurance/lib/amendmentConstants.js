const LifeInsuranceCancellationDefaultValue = {
    technicalInformation: {},
    basicAmendmentConditions: {},
    paymentAmendmentConditions: {},
    allocationsInfo: [],
    contractVersions: [],
    attachmentsPackage: [],
    taxDeductionItems: []
};

const amendmentReason = {
    byClientCoolOff: "byClientCoolOff",
    byClientNonCoolOff: "byClientNonCoolOff",
    partialRepayment: "partialRepayment",
    byCompany: "byCompany",
    byCourt: "byCourt",
    creditRepayment: "creditRepayment",
    individualCommission: "individualCommission",
    holderDeath: "holderDeath",
    partiesAgreement: "partiesAgreement"
};

const receiveMethod = {
    email: "email",
    office: "office",
    personalCabinet: "personalCabinet",
    post: "post",
    partner: "partner"
};

const amendmentState = {
    Draft: 'Draft',
    OperationsApproval: 'OperationsApproval',
    RequestToClient: 'RequestToClient',
    OperationsDirectorApproval: 'OperationsDirectorApproval',
    Active: 'Active',
    Cancelled: 'Cancelled',
    SentToPayment: 'SentToPayment'
};

const financialAmendmentState = {
    Draft: 'Draft',
    OperationsApproval: 'OperationsApproval',
    Activated: 'Activated',
    Cancelled: 'Cancelled'
};

const nonFinancialAmendmentState = {
    OperationsApproval: 'OperationsApproval',
    RequestToClient: 'RequestToClient',
    Activated: 'Activated',
    Cancelled: 'Cancelled',
    Rejected: 'Rejected',
    RejectedByClient: 'RejectedByClient',
    InsuranceMethodologyApproval: 'InsuranceMethodologyApproval',
    ActuaryApproval: 'ActuaryApproval',
    LegalApproval: 'LegalApproval',
    SecurityApproval: 'SecurityApproval',
    UnderwriterApproval: 'UnderwriterApproval',
    CallCenterApproval: 'CallCenterApproval',
    PartnerSalesSupportApproval: 'PartnerSalesSupportApproval',
    CustomerServiceApproval: 'CustomerServiceApproval'
};

const nonFinancialAmendmentTransition = {
    CallCenterApprovalToRequestToClient: 'CallCenterApproval_to_RequestToClient',
    PartnerSalesSupportApprovalToRequestToClient: 'PartnerSalesSupportApproval_to_RequestToClient',
    CustomerServiceApprovalToRequestToClient: 'CustomerServiceApproval_to_RequestToClient',
    OperationsApprovalToActivatedSystem: 'OperationsApproval_to_Activated_System',
};

const amendmentType = {
    Cancellation: 'Cancellation',
    Reactivation: 'Reactivation',
    NonFinancialChange: 'NonFinancialChange',
    FinancialChange: 'FinancialChange',
    Technical: 'Technical'
};

const usersWithRightsToCreateChangeAmendment = [
    'Administrator',
    'System' // life-insurance routes
];

const hasTaxDeductionCertificateValues = {
    yes: "yes",
    no: "no"
};

const isTaxDeductionClaimedValues = {
    yes: "yes",
    no: "no",
    noInfo: "noInfo",
    thirdParty: "thirdParty"
};

const taxDeductionClaimedValuesWithCertificate = [
    isTaxDeductionClaimedValues.yes,
    isTaxDeductionClaimedValues.no
];

const taxDeductionClaimedValuesWithoutCertificate = [
    isTaxDeductionClaimedValues.thirdParty,
    isTaxDeductionClaimedValues.noInfo
];

const taxDeductionAmounts = {
    min: 0,
    max: 120000
};

const minTaxDeductionYear = 2015;

const statementReceiveMethod = {
    email: "email",
    office: "office",
    personalCabinet: "personalCabinet",
    post: "post",
    partner: "partner"
};

const initiatorType = {
    insurer: "insurer",
    applicant: "applicant"
};

const amendmentSubType = {
    byCompanyDecision: "byCompanyDecision",
    byClientDecision: "byClientDecision",
    byCourtDecision: "byCourtDecision",
    byCommissionDecision: "byCommissionDecision"
};

const amendmentReasonBySubType = {
    byCompanyDecision: [amendmentReason.byCompany, amendmentReason.holderDeath, amendmentReason.partiesAgreement],
    byClientDecision: [amendmentReason.creditRepayment, amendmentReason.byClientCoolOff, amendmentReason.byClientNonCoolOff, amendmentReason.partialRepayment],
    byCourtDecision: [amendmentReason.byCourt],
    byCommissionDecision: [amendmentReason.individualCommission]
};

const amendmentPaymentLineType = {
    surrenderValue: 'surrenderValue',
    investProfit: 'investProfit',
    pit: 'PIT',
    paymentRefund: 'paymentRefund',
    creditRefund: 'creditRefund',
    debt: 'debt',
    obligations: 'obligations',
    pitRefund: 'PITRefund',
    partialPremiumRefund: 'partialPremiumRefund',
};

const cancellationAmendmentState = {
    Draft: 'Draft',
    OperationsApproval: 'OperationsApproval',
    RequestToClient: 'RequestToClient',
    OperationsDirectorApproval: 'OperationsDirectorApproval',
    POCreation: 'POCreation',
    SentToPayment: 'SentToPayment',
    Paid: 'Paid',
    Active: 'Active',
    Cancelled: 'Cancelled',
    Rejected: 'Rejected',
    AwaitingApproval: 'AwaitingApproval',
    AwaitingCancellationDate: 'AwaitingCancellationDate',
    AwaitingPaymentDocuments: 'AwaitingPaymentDocuments',
    AwaitingDissolution: 'AwaitingDissolution',
    AssetsSold: 'AssetsSold'
};

const defaultCancellationRecipientReason = {
    code: '006',
    description: 'Страхователь'
};

const defaultCancellationRecipientPaymentType = {
    code: '005',
    description: 'На расчетный счет'
};

const availableCancellationRecipientPaymentType = [
    {
        code: '005',
        description: 'На расчетный счет'
    },
    {
        code: '006',
        description: 'В счёт оплаты взноса'
    }
];

const cancellationStatesToValidateBankAccounts = [
    cancellationAmendmentState.Draft,
    cancellationAmendmentState.OperationsApproval,
    cancellationAmendmentState.OperationsDirectorApproval,
    cancellationAmendmentState.SentToPayment,
    cancellationAmendmentState.AwaitingPaymentDocuments
];

const cancellationRecipientReasons = {
    insuredPerson: '001',
    insuredPersonRepresentative: '002',
    policyHolder: '006'
};

const amendmentPaymentLinesGroups = {
    byClientDecision: {
        byClientCoolOff: [
            amendmentPaymentLineType.paymentRefund,
            amendmentPaymentLineType.creditRefund,],
        creditRepayment: [amendmentPaymentLineType.partialPremiumRefund],
        partialRepayment: [amendmentPaymentLineType.partialPremiumRefund],
        byClientNonCoolOff: [
            amendmentPaymentLineType.surrenderValue,
            amendmentPaymentLineType.investProfit,
            amendmentPaymentLineType.pit,
            amendmentPaymentLineType.debt,
            amendmentPaymentLineType.obligations,
            amendmentPaymentLineType.creditRefund
        ]
    },
    byCompanyDecision: {
        byCompany: [
            amendmentPaymentLineType.surrenderValue,
            amendmentPaymentLineType.investProfit,
            amendmentPaymentLineType.pit,
            amendmentPaymentLineType.debt,
            amendmentPaymentLineType.obligations,
            amendmentPaymentLineType.creditRefund
        ],
        holderDeath: [
            amendmentPaymentLineType.surrenderValue,
            amendmentPaymentLineType.investProfit,
            amendmentPaymentLineType.pit,
            amendmentPaymentLineType.debt,
            amendmentPaymentLineType.obligations,
            amendmentPaymentLineType.creditRefund
        ],
        partiesAgreement: [
            amendmentPaymentLineType.surrenderValue,
            amendmentPaymentLineType.investProfit,
            amendmentPaymentLineType.pit,
            amendmentPaymentLineType.debt,
            amendmentPaymentLineType.obligations,
            amendmentPaymentLineType.creditRefund,
            amendmentPaymentLineType.paymentRefund,
            amendmentPaymentLineType.partialPremiumRefund
        ],

    },
    byCourtDecision: {
        byCourt: [
            amendmentPaymentLineType.surrenderValue,
            amendmentPaymentLineType.investProfit,
            amendmentPaymentLineType.pit,
            amendmentPaymentLineType.debt,
            amendmentPaymentLineType.obligations,
            amendmentPaymentLineType.creditRefund,
            amendmentPaymentLineType.paymentRefund,
            amendmentPaymentLineType.partialPremiumRefund
        ],
    },
    byCommissionDecision: {
        individualCommission: [
            amendmentPaymentLineType.surrenderValue,
            amendmentPaymentLineType.investProfit,
            amendmentPaymentLineType.pit,
            amendmentPaymentLineType.debt,
            amendmentPaymentLineType.obligations,
            amendmentPaymentLineType.creditRefund,
            amendmentPaymentLineType.paymentRefund,
            amendmentPaymentLineType.partialPremiumRefund
        ],
    }
};

const amendmentPaymentLineWeight = {
    surrenderValue: 1,
    creditRefund: 2,
    paymentRefund: 3,
    partialPremiumRefund: 4,
    investProfit: 5,
    PIT: 6,
    PITRefund: 7,
    debt: 8,
    obligations: 9
};

const recipientReasons = {
    insuredPerson: '001',
    insuredPersonRepresentative: '002',
    policyBeneficiary: '003',
    heir: '004',
    heirRepresentative: '005',
    policyHolder: '006',
    policyHolderRepresentative: '007'
};

const recipientPaymentType = {
    insuredBankAccount: '001',
    representativeBankAccount: '002',
    beneficiaryBankAccount: '003',
    hardCash: '004',
    bankAccount: '005',
    nettingPayment: '006'
};

const investmentProfitTypes = {
    investProfit: { code: 1, description: "ДИД" },
    investProfitCoupon: { code: 2, description: "ДИД Купон" },
    investProfitAnnual: { code: 3, description: "ДИД Аннуитет" },
    dividends: { code: 4, description: "Дивиденды" },
};

const insuredEventReasons = {
    annualOrCoupon: { code: "301", description: "Аннуитет/Гарантированный купон" },
    contractEnd: { code: "302", description: "Окончание срока действия договора" },
    nonGuaranteedCoupon: { code: "701", description: "Негарантированный купон" }
};

const technicalAmendmentState = {
    Draft: 'Draft',
    Activated: 'Activated',
    Cancelled: 'Cancelled'
};

const amendmentRelationsByBaseConfiguration = {
    AccumulatedLifeInsurancePolicy: 'AccumulatedLifeInsurancePolicyCreateLifeAmendmentCancellationRelation',
    CreditLifeInsurancePolicy: 'CreditLifeInsurancePolicyCreateLifeAmendmentCancellationRelation',
    EquityLifeInsurancePolicy: 'EquityLifeInsurancePolicyCreateLifeAmendmentCancellationRelation',
    InvestmentLifeInsurancePolicy: 'InvestmentLifeInsurancePolicyCreateLifeAmendmentCancellationRelation',
    MedLifeInsurancePolicy: 'MedLifeInsurancePolicyCreateLifeAmendmentCancellationRelation',
    AccidentLifeInsurancePolicy: 'AccidentLifeInsurancePolicyCreateLifeAmendmentCancellationRelation',
    RiskLifeInsurancePolicy: 'RiskLifeInsurancePolicyCreateLifeAmendmentCancellationRelation'
};

const financialChangeRelationsByBaseConfiguration = {
    AccumulatedLifeInsurancePolicy: 'AccumulatedLifeInsurancePolicyCreateFinancialChangeAmendmentRelation',
    CreditLifeInsurancePolicy: 'CreditLifeInsurancePolicyCreateFinancialChangeAmendmentRelation',
    EquityLifeInsurancePolicy: 'EquityLifeInsurancePolicyCreateFinancialChangeAmendmentRelation',
    InvestmentLifeInsurancePolicy: 'InvestmentLifeInsurancePolicyCreateFinancialChangeAmendmentRelation',
    MedLifeInsurancePolicy: 'MedLifeInsurancePolicyCreateFinancialChangeAmendmentRelation',
    AccidentLifeInsurancePolicy: 'AccidentLifeInsurancePolicyCreateFinancialChangeAmendmentRelation',
    RiskLifeInsurancePolicy: 'RiskLifeInsurancePolicyCreateFinancialChangeAmendmentRelation'
};

const cancellationStatesToAllocateActivities = [
    amendmentState.Draft,
    amendmentState.OperationsApproval,
    amendmentState.RequestToClient,
    amendmentState.OperationsDirectorApproval,
    cancellationAmendmentState.AwaitingApproval,
    cancellationAmendmentState.AwaitingCancellationDate,
    cancellationAmendmentState.AwaitingPaymentDocuments
];

const portfolioMovementAmendmentDocuments = [
    'AccidentLifeInsurancePortfolioMovement',
    'AccumulatedLifeInsurancePortfolioMovement',
    'CreditLifeInsurancePortfolioMovement',
    'EquityLifeInsurancePortfolioMovement',
    'InvestmentLifeInsurancePortfolioMovement',
    'MedLifeInsurancePortfolioMovement',
    'RiskLifeInsurancePortfolioMovement'
];

module.exports = {
    LifeInsuranceCancellationDefaultValue,
    amendmentReason,
    receiveMethod,
    amendmentState,
    financialAmendmentState,
    nonFinancialAmendmentState,
    nonFinancialAmendmentTransition,
    amendmentType,
    usersWithRightsToCreateChangeAmendment,
    hasTaxDeductionCertificateValues,
    isTaxDeductionClaimedValues,
    taxDeductionClaimedValuesWithCertificate,
    taxDeductionClaimedValuesWithoutCertificate,
    taxDeductionAmounts,
    minTaxDeductionYear,
    statementReceiveMethod,
    initiatorType,
    amendmentSubType,
    amendmentReasonBySubType,
    amendmentPaymentLineType,
    cancellationAmendmentState,
    defaultCancellationRecipientReason,
    defaultCancellationRecipientPaymentType,
    availableCancellationRecipientPaymentType,
    cancellationStatesToValidateBankAccounts,
    cancellationRecipientReasons,
    amendmentPaymentLinesGroups,
    amendmentPaymentLineWeight,
    recipientReasons,
    recipientPaymentType,
    investmentProfitTypes,
    insuredEventReasons,
    technicalAmendmentState,
    amendmentRelationsByBaseConfiguration,
    cancellationStatesToAllocateActivities,
    financialChangeRelationsByBaseConfiguration,
    portfolioMovementAmendmentDocuments
};
