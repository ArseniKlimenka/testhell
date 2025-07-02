module.exports = function mapping(errorLineInput, sinkExchange) {

    const ptNumber = this.businessContext.etlServiceInput.portfolioTransferNumber;

    let sat = {};

    if (errorLineInput.dataSource) {

        const { cause, rawData } = errorLineInput.dataSource;

        const errorMessage = cause + ': ' + errorLineInput.message;

        sat = {
            PORTFOLIO_TRANSFER_NUMBER: ptNumber,
            CONTRACT_NUMBER: rawData.CONTRACT_NUMBER,
            STATE: rawData.STATE,
            ERROR: errorMessage,
        };
    } else if (errorLineInput.sink) {

        const errorMessage = errorLineInput.message + ': ' + errorLineInput.stackTrace;
        sat = {
            PORTFOLIO_TRANSFER_NUMBER: ptNumber,
            CONTRACT_NUMBER: errorLineInput.input.contractNumber,
            STATE: errorLineInput.input.stateCode,
            ERROR: errorMessage,
        };
    }

    return {
        'ACC_IMPL.PORTFOLIO_TRANSFER_DOCUMENT_SAT': [sat]
    };
};
