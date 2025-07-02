
const claimConfigurantionNames = {
    claim: 'Claim',
    collectiveClaim: 'CollectiveClaim',
    endowment: 'Endowment',
    insuredEvent: 'InsuredEvent'
};

const amountConsts = {
    methodologyDirectorApproval: 1000000,
    legalAndSecurityApproval: 500000
};

const transitionNames = {
    legalToCalimManager: 'LegalApprovalToClaimManagerApproval',
    securityToClaimManager: 'SecurityApprovalToClaimManagerApproval',
    sentToPaymentToPaid: 'SentToPaymentToPaid',
    sentToPaymentToPartiallyPaid: 'SentToPaymentToPartiallyPaid',
    sentToPaymentToOusv: 'SentToPaymentToOUSV',
    partiallyPaidToPaid: 'PartiallyPaidToPaid',
    ousvToPaid: 'OUSVToPaid',
    claimManagerToExternalOrganisation: 'ClaimManagerApprovalToRequestToExternalOrganisation',
    externalOrganisationToClaimManager: "RequestToExternalOrganisationToClaimManagerApproval"
};

const claimStates = {
    draft: 'Draft',
    claimManagerApproval: 'ClaimManagerApproval',
    requestToClient: 'RequestToClient',
    requestToExternalOrganisation: 'RequestToExternalOrganisation',
    expired: 'Expired',
    legalApproval: 'LegalApproval',
    securityApproval: 'SecurityApproval',
    claimDiretorApproval: 'ClaimDirectorApproval',
    poCreation: 'POCreation',
    sentToPayment: 'SentToPayment',
    methodologyDirectorApproval: 'MethodologyDirectorApproval',
    paid: 'Paid',
    partiallyPaid: 'PartiallyPaid',
    rejectedByCommonReasons: 'RejectedByCommonReasons',
    rejected: 'Rejected',
    cancelled: 'Cancelled',
    ousv: 'OUSV',
    claimImportInProgress: 'ClaimImportInProgress'
};

const insuredEventStates = {
    draft: 'Draft',
    registered: 'Registered',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled'
};

const risksCodes = {
    kzTreatment: 'CDH10800',
    injuries: 'I42204',
    death: 'DLP42204',
    disability: 'D42204',
    jobLoss: 'JL42204',
    disabilityByAccident: 'DA36102',
    accidentLossOfAbilityToWork: 'CTDA36404',
    unableToWorkAnyReason: 'TDLP42204',
    hospitalizationDueToAccident: 'HA42204'
};

const kzRisks = [
    "CDH10800",
    "CDP36102",
    "CD42204"
];

const injuryRisks = [
    "I42204",
    "HI36102"
];

const deathRisks = [
    "DLP42204",
    "DLPSS36102",
    "DPVV36102",
    "DLP36904",
    "DLPDP36904",
    "IDLPVV36904",
    "IDLPDP36904"
];

const anyReasonDisabilityRisks = [
    "D42204",
    "D36102"
];

const endowmentRisks = [
    "E36404",
    "E36904",
    "E36102",
    "ME36202"
];

const risksWithPaidDays = [
    risksCodes.jobLoss,
    risksCodes.accidentLossOfAbilityToWork,
    risksCodes.unableToWorkAnyReason,
    risksCodes.hospitalizationDueToAccident
];

const insuredEventTypes = {
    unemployment: '500',
    accident: "100",
    illnes: "200",
    endowment: "300",
    paymentPeriodStart: "400",
    additionalHealthInsurance: "600",
    investProfit: "700"
};

const insuredEventReasons = {
    annualOrCoupon: { code: "301", description: "Аннуитет/Гарантированный купон" },
    contractEnd: { code: "302", description: "Окончание срока действия договора" },
    nonGuaranteedCoupon: {code: "701", description: "Негарантированный купон"}
};

const operationsOnlyTypes = [
    insuredEventTypes.investProfit,
    insuredEventTypes.endowment
];

const beneficiaryReasons = {
    insuredPerson: '001',
    insuredPersonRepresentative: '002',
    policyHolder: '006'
};

const transitions = {
    claimManagerToClaimDirector: 'ClaimManagerApprovalToClaimDirectorApproval',
    legalToClaimManager: 'LegalApprovalToClaimManagerApproval',
    securityToClaimManager: 'SecurityApprovalToClaimManagerApproval',
    claimDirectorToSentToPayment: 'ClaimDirectorApprovalToSentToPayment',
    claimDirectorToMethodologyDirector: 'ClaimDirectorApprovalToMethodologyDirectorApproval',
    methodologyDirectorToSentToPayment: 'MethodologyDirectorApprovalToSentToPayment'
};

const insurentEventTypesWithDiagnosis = [
    insuredEventTypes.accident,
    insuredEventTypes.illnes,
    insuredEventTypes.additionalHealthInsurance
];

const claimStatesToValidateBankAccounts = [
    claimStates.claimManagerApproval,
    claimStates.claimDiretorApproval,
    claimStates.methodologyDirectorApproval,
    claimStates.sentToPayment,
    claimStates.partiallyPaid
];

const printoutConsts = {
    cliamMailPrefix: '99-40-122-02'
};

const endowmentStates = {
    operationsApproval: "OperationsApproval",
    operationsDirectorApproval: "OperationsDirectorApproval",
    insuranceMethodologyApproval: "InsuranceMethodologyApproval",
    actuaryApproval: "ActuaryApproval",
    accountingApproval: "AccountingApproval",
    complianceApproval: "ComplianceApproval",
    securityApproval: "SecurityApproval",
    legalApproval: "LegalApproval",
    callCenterApproval: "CallCenterApproval",
    partnerSalesSupportApproval: "PartnerSalesSupportApproval",
    clientServiceApproval: "ClientServiceApproval",
    requestToClient: "RequestToClient",
    deputyDirectorAproval: "DeputyDirectorAproval",
    sentToPayment: "SentToPayment",
    partiallyPaid: "PartiallyPaid",
    paid: "Paid",
    rejected: "Rejected",
    cancelled: "Cancelled",
    poCreation: "POCreation",
    awaitingApproval: "AwaitingApproval",
    awaitingInquiries: "AwaitingInquiries",
    awaitingEndowmentDate: "AwaitingEndowmentDate"
};

const endowmentStatesToValidateBankAccounts = [
    endowmentStates.operationsApproval,
    endowmentStates.operationsDirectorApproval,
    endowmentStates.deputyDirectorAproval,
    endowmentStates.sentToPayment,
    endowmentStates.partiallyPaid,
    endowmentStates.awaitingApproval
];

const endowmentStatesToDisableBeneficiaries = [
    endowmentStates.insuranceMethodologyApproval,
    endowmentStates.actuaryApproval,
    endowmentStates.complianceApproval,
    endowmentStates.securityApproval,
    endowmentStates.legalApproval,
    endowmentStates.callCenterApproval,
    endowmentStates.requestToClient
];

const endowmentTransitions = {
    sentToPaymentToPaid: 'SentToPaymentToPaid',
    sentToPaymentToPartiallyPaid: 'SentToPaymentToPartiallyPaid',
    partiallyPaidToPaid: 'PartiallyPaidToPaid',
    operationsToOperationsDirector: 'OperationsApprovalToOperationsDirectorApproval',
    operationsDirectorToDeputyDirector: 'OperationsDirectorApprovalToDeputyDirectorAproval',
    operationsDirectorToSentToPayment: 'OperationsDirectorApprovalToSentToPayment',
    directorToSentToPayment: 'DirectorAprovalToSentToPayment',
    insuranceMethodologyToOperations: 'InsuranceMethodologyApprovalToOperationsApproval',
    actuaryToOperations: 'ActuaryApprovalToOperationsApproval',
    accountingToOperations: 'AccountingApprovalToOperationsApproval',
    complianceToOperations: 'ComplianceApprovalToOperationsApproval',
    securityToOperations: 'SecurityApprovalToOperationsApproval',
    legalToOperations: 'LegalApprovalToOperationsApproval',
    deputyDirectorToSentToPayment: 'DeputyDirectorAprovalToSentToPayment',
    operationsToPoCreation: 'OperationsApproval_to_POCreation'
};

const endowmentPaymentLineType = {
    PIT: "PIT",
    surrenderValue: "surrenderValue",
    investProfit: "investProfit",
    investProfitAnnual: "investProfitAnnual",
    investProfitCoupon: "investProfitCoupon",
    dividends: "dividends",
    debt: "debt"
};

const endowmentEventType = {
    code: '300',
    description: 'Дожитие'
};

const investmentEventType = {
    code: '700',
    description: 'ДИД'
};

const endowmentPaymentVariant = {
    single: 'single',
    term: 'term',
    wholeLife: 'wholeLife'
};

const defaultEndowmentBeneficiaryReason = {
    code: '003',
    description: 'Выгодоприобретатель по договору страхования'
};

const defaultClaimBeneficiaryReason = {
    code: '003',
    description: 'Выгодоприобретатель по договору страхования'
};

const defaultEndowmentBeneficiaryPaymentType = {
    code: '003',
    description: 'На расчетный счет Выгодоприобретателя'
};

const availableEndowmentBeneficiaryPaymentType = [
    {
        code: '003',
        description: 'На расчетный счет Выгодоприобретателя'
    },
    {
        code: '006',
        description: 'В счёт оплаты взноса'
    }
];

const defaultClaimBeneficiaryPaymentType = {
    code: '005',
    description: 'На расчетный счет'
};

const endowmentPaymentFrequency = {
    single: '1',
    annual: '2',
    halfYear: '3',
    quarter: '4',
    monthly: '5'
};

const actorsWithRightsToCreateEndowment = [
    'Operations'
];

const endowmentRejectionReason = {
    eventDateNotReached: 'eventDateNotReached',
    notInsuredOrBeneficiary: 'notInsuredOrBeneficiary',
    policyCancelled: 'policyCancelled',
    policyEnd: 'policyEnd',
    other: 'other'
};

const investmentProfitTypes = {
    investProfit: {code: 1, description: "ДИД"},
    investProfitCoupon: {code: 2, description: "ДИД Купон"},
    investProfitAnnual: {code: 3, description: "ДИД Аннуитет"},
    dividends: {code: 4, description: "Дивиденды"},
    slp: {code: 5, description: "ДИД СЛП"},
};

const endowmentAmountToRequireApproval = 3000000;

const endowmentPaymentLinesGroups = {

    300: {
        301: [
            endowmentPaymentLineType.surrenderValue,
            endowmentPaymentLineType.investProfit,
            endowmentPaymentLineType.investProfitAnnual
        ],
        302: [
            endowmentPaymentLineType.surrenderValue,
            endowmentPaymentLineType.investProfit,
            endowmentPaymentLineType.investProfitCoupon,
            endowmentPaymentLineType.PIT,
            endowmentPaymentLineType.debt
        ]
    },
    700: {
        701: [
            endowmentPaymentLineType.investProfitCoupon,
            endowmentPaymentLineType.dividends
        ]
    }
};

const endowmentPaymentLineWeight = {
    surrenderValue: 1,
    investProfit: 2,
    investProfitAnnual: 3,
    investProfitCoupon: 4,
    PIT: 6,
    debt: 8
};

const beneficiaryPaymentTypes = {
    insuredBankAccount: '001',
    representativeBankAccount: '002',
    beneficiaryBankAccount: '003',
    cash: '004',
    bankAccount: '005',
    netting: '006'
};

const endowmentStatesWithoutInvestmentProfitsRecalculate = [

    endowmentStates.rejected,
    endowmentStates.paid,
    endowmentStates.cancelled,
    endowmentStates.sentToPayment
];

const riskCalcualtionTypes = {
    coefficient: 'coefficient',
    singleValue: 'singleValue'
};

const endowmentInquiryStates = {
    issued: 'Issued'
};

const claimUserGroups = {
    operationsDirector: 'operationsDirector',
    legal: 'legal',
    compliance: 'compliance'
};

const claimActors = {
    operations: 'Operations',
    claimManager: 'ClaimManager'
};

const claimStatesToAllocateActivities = [
    claimStates.claimManagerApproval,
    claimStates.requestToClient,
    claimStates.requestToExternalOrganisation,
    claimStates.securityApproval,
    claimStates.legalApproval,
    claimStates.claimDiretorApproval,
    claimStates.methodologyDirectorApproval
];

const endowmentStatesToAllocateActivities = [
    endowmentStates.operationsApproval,
    endowmentStates.awaitingInquiries,
    endowmentStates.awaitingApproval,
    endowmentStates.awaitingEndowmentDate,
    endowmentStates.operationsDirectorApproval,
    endowmentStates.deputyDirectorApproval
];

const claimPaymentLineType = {
    mainAmount: "mainAmount",
    invProfitSlp: "invProfitSlp"
};

const injuryGroupName = 'INJURY';

module.exports = {
    amountConsts,
    transitionNames,
    claimStates,
    insuredEventStates,
    risksCodes,
    kzRisks,
    injuryRisks,
    deathRisks,
    anyReasonDisabilityRisks,
    endowmentRisks,
    insuredEventTypes,
    beneficiaryReasons,
    transitions,
    insurentEventTypesWithDiagnosis,
    claimStatesToValidateBankAccounts,
    risksWithPaidDays,
    printoutConsts,
    operationsOnlyTypes,
    endowmentStates,
    endowmentStatesToDisableBeneficiaries,
    insuredEventReasons,
    endowmentPaymentLineType,
    endowmentEventType,
    investmentEventType,
    endowmentPaymentVariant,
    endowmentPaymentFrequency,
    defaultEndowmentBeneficiaryReason,
    defaultEndowmentBeneficiaryPaymentType,
    availableEndowmentBeneficiaryPaymentType,
    actorsWithRightsToCreateEndowment,
    defaultClaimBeneficiaryReason,
    defaultClaimBeneficiaryPaymentType,
    endowmentTransitions,
    endowmentRejectionReason,
    endowmentStatesToValidateBankAccounts,
    endowmentAmountToRequireApproval,
    endowmentPaymentLinesGroups,
    endowmentPaymentLineWeight,
    beneficiaryPaymentTypes,
    investmentProfitTypes,
    endowmentStatesWithoutInvestmentProfitsRecalculate,
    claimConfigurantionNames,
    riskCalcualtionTypes,
    endowmentInquiryStates,
    claimUserGroups,
    claimActors,
    claimStatesToAllocateActivities,
    endowmentStatesToAllocateActivities,
    claimPaymentLineType,
    injuryGroupName
};
