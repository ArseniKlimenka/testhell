'use strict';

module.exports = function mapping(input, sinkExchange) {

    const ptNumber = this.businessContext.etlServiceInput.portfolioTransferNumber;

    const sat = {
        PORTFOLIO_TRANSFER_NUMBER: ptNumber,
        CONTRACT_NUMBER: input.contractNumber,
        STATE: 'AmendmentCreated',
    };

    return {
        'ACC_IMPL.PORTFOLIO_TRANSFER_DOCUMENT_SAT': [sat],
    };
};
