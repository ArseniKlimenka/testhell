const portfolioTransferStatusId = {
    NONE: 0,
    DRAFT: 1,
    TRANSFER_PROCESSING: 2,
    PROCESSED_WITH_ERRORS: 3,
    PROCESSED: 4
};

const agentSadTranslation = {

    sadNumber: "САД РГСЖ",
    sadNumber1: "1-й САД РГСЖ",
    sadNumber2: "2-й САД РГСЖ",
    sadNumberMag: "САД РГСЖ МАГа",
    sadNumberNso: "САД РГСЖ НСО",
};

const portfolioTransferStatusCode = {
    DRAFT: 'Draft',
    TRANSFER_PROCESSING: 'TransferProcessing',
    PROCESSED_WITH_ERRORS: 'ProcessedWithErrors',
    PROCESSED: 'Processed'
};

module.exports = {
    portfolioTransferStatusId,
    portfolioTransferStatusCode,
    agentSadTranslation,
};
