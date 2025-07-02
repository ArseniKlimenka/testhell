const allocationDocumentType = {
    POLICY: 1,
    PAYMENT_ORDER_INCOMING: 2,
    PAYMENT_ORDER_OUTGOING: 3,
    REGISTRY: 4,
    COMMISSION_ACT: 5,
};

const journalTypes = {
    PAYMENT_ORDER: 1001,
};

const invoicedCommissionTypeIds = {
    REGULAR: 1,
    VOID: 2,
};

const revaluationTypeIds = {
    PREMIUM: 1,
    INVOICED_COMMISSION: 2,
};

const documentType = {
    SALES_INVOICE: 1,
    TOLERANCE_PAYMENT: 1001,
    INVOICED_COMMISSION: 1002,
    COMMISSION_ACT: 1003,
    CLAIM: 1004,
    PAYMENT_ORDER_CLAIM: 1005,
    PAYMENT_ORDER_COMMISSION: 1006,
    PAYMENT_ORDER_PAYMENT_REFUND: 1007,
    PAYMENT_ORDER_POLICY_CANCELLATION: 1008,
    POLICY_CANCELLATION_CREDIT_REPAYMENT: 1009,
    TOLERANCE_UNDERPAYMENT: 1010,
    TOLERANCE_OVERPAYMENT: 1011,
    ADVANCE_PAYMENT_ALLOCATION: 1012,
    ADVANCE_PAYMENT_ALLOCATION_POSTED: 1013,
    SALES_INVOICE_CANCELLATION_NOT_PAID: 1014,
    SALES_INVOICE_CANCELLATION_PAID: 1015,
    INVOICED_COMMISSION_CANCELLATION: 1016,
    PAYMENT_ORDER_INVEST_PROFIT: 1017,
    PAYMENT_ORDER_POLICY_CANCELLATION_PIT: 1019,
    REVALUATION_PREMIUM: 1022,
    RSD_APPROVED: 1023,
    RSD_PAYMENT_ALLOCATION: 1024,
    REVALUATION_IC: 1025,
    SALES_INVOICE_FINANCIAL_CHANGE: 1026,
};

const businessEventTypeIds = {
    SALES_INVOICE_ACTIVATION: 1,
    COMMISSION_POSTING: 1000,
    REVALUATION: 1001,
};

const journalTypeIds = {
    GENERAL_JOURNAL: 3,
    REVALUATION: 1000,
    PAYMENT_ORDER: 1001,
};

const periodStatus = {
    OPEN: 1,
    CLOSED: 3,
};

const periodType = {
    CONTRACT: 1,
    PAYMENT: 2,
    COMMISSION_ACT: 3,
    PAYMENT_ORDER: 4,
    REVALUATION: 5,
};

const actorConstants = {
    CHIEF_ACCOUNTANT: 'ChiefAccountant',
    ACCOUNTANT: 'Accountant',
};

module.exports = {
    allocationDocumentType,
    journalTypes,
    invoicedCommissionTypeIds,
    revaluationTypeIds,
    documentType,
    businessEventTypeIds,
    journalTypeIds,
    periodStatus,
    periodType,
    actorConstants,
};
