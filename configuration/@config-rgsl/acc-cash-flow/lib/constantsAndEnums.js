const actorConstants = {
    CHIEF_PAYMENT_DISTRIBUTOR: 'ChiefPaymentDistributor',
    PAYMENT_DISTRIBUTOR: 'PaymentDistributor',
};

const allocationToleranceType = {
    NONE: 0,
    STANDARD: 1,
    EXTENDED: 2,
    EXTENDED_UNDER_PAYMENT: 3,
    EXTENDED_OVER_PAYMENT: 4,
};

const paymentStatus = {
    NotAllocated: 0,
    PartiallyAllocated: 1,
    Allocated: 2,
    Cancelled: 3,
    AllocatedToRegistry: 4
};

const refundablePaymentStatuses = [ paymentStatus.NotAllocated, paymentStatus.PartiallyAllocated ];

const allocatedPaymentStatuses = [ paymentStatus.Allocated, paymentStatus.PartiallyAllocated ];

/**
 * Code Table for ACC_IMPL.CT_BSI_REGISTRY_SOURCE
 *
 * @translationKey {translationKey} fileFormatBsiXml
 * @translationKey {translationKey} fileFormatBsiXlsx
 *
 */

const sourceFileFormatBsiDataConstants = [
    {
        fileFormat: 1,
        formatName: 'fileFormatBsiXml',
        dataSourceName: `BankStatementFileLoader`,
    },
    {
        fileFormat: 2,
        formatName: 'fileFormatBsiXlsx',
        dataSourceName: `BankStatementXlsxFileLoader`,
    }
];

module.exports = {
    paymentStatus,
    refundablePaymentStatuses,
    allocatedPaymentStatuses,
    actorConstants,
    allocationToleranceType,
    sourceFileFormatBsiDataConstants,
};
