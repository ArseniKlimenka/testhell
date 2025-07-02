const commissionActTypeId = {
    Normal: 1,
    Extra: 2,
    Migration: 3,
};

const commissionActStatusId = {
    NONE: 0,
    DRAFT: 1,
    DELETED: 2,
    CONFIRMING: 3,
    CONFIRMED: 4,
    APPROVED: 5,
    COMPLETED_PAY_ORDER: 6,
    COMPLETED_PAID: 7,
    ANNULLED: 8,
    GENERATING: 9,
};

const commissionActStatusCode = {
    DRAFT: 'Draft',
    DELETED: 'Deleted',
    CONFIRMING: 'Confirming',
    CONFIRMED: 'Confirmed',
    APPROVED: 'Approved',
    COMPLETED_PAY_ORDER: 'CompletedPayOrder',
    COMPLETED_PAID: 'CompletedPaid',
    ANNULLED: 'Annulled',
    GENERATING: 'Generating',
};

const commissionActStatusCodes = {
    'None': 0,
    'Draft': 1,
    'Deleted': 2,
    'Confirming': 3,
    'Confirmed': 4,
    'Approved': 5,
    'CompletedPayOrder': 6,
    'CompletedPaid': 7,
    'Annulled': 8,
    'Generating': 9,
};

const commissionActStatusCodesBack = [
    'None',
    'Draft',
    'Deleted',
    'Confirming',
    'Confirmed',
    'Approved',
    'CompletedPayOrder',
    'CompletedPaid',
    'Annulled',
    'Generating',
];

const commissionActItemStatusId = {
    NORMAL: 0,
    NEW: 1,
    REMOVED: 2,
    RENEW: 3,
};

module.exports = {
    commissionActTypeId,
    commissionActStatusId,
    commissionActStatusCode,
    commissionActStatusCodes,
    commissionActStatusCodesBack,
    commissionActItemStatusId,
};
