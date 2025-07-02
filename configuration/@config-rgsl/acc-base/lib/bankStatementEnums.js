const bankStatementDocumentType = {
    ACCOUNT_RECEIPT: 1,
    ACCOUNT_WRITEOFF: 2,
};

const bankStatementDirection = {
    INCOMING: 1,
    OUTGOING: 2,
};

const bankStatementItemToleranceType = {
    EXTENDED: 1,
    STANDARD: 2,
    EXTENDED_UNDER_PAYMENT: 3,
    EXTENDED_OVER_PAYMENT: 4,
};

const bankStatementItemStatusId = {
    NOT_ALLOCATED: 0,
    PARTIALLY_ALLOCATED: 1,
    ALLOCATED: 2,
    CANCELLED: 3,
    ALLOCATED_TO_REGISTRY: 4,
};

const bankStatementItemSourceId = {
    BANK_STATEMENT: 1,
    REGISTRY: 2,
    PAYMENT_ORDER: 3,
    RSD: 4,
};

module.exports = {
    bankStatementDocumentType,
    bankStatementDirection,
    bankStatementItemToleranceType,
    bankStatementItemStatusId,
    bankStatementItemSourceId,
};
