'use strict';

module.exports = function mapping(input, sinkExchange) {
    if (input.oldState !== 'Draft') {
        return;
    }

    const ptNumber = input.number;
    const contractNumbers = sinkExchange.resolveContext('contractNumbers');

    const links = contractNumbers.map(c => ({
        PORTFOLIO_TRANSFER_NUMBER: ptNumber,
        CONTRACT_NUMBER: c,
    }));

    const sats = contractNumbers.map(c => ({
        PORTFOLIO_TRANSFER_NUMBER: ptNumber,
        CONTRACT_NUMBER: c,
        STATE: 'Created',
        ERROR: undefined,
    }));

    return {
        'ACC_IMPL.PORTFOLIO_TRANSFER_DOCUMENT_LINK': links,
        'ACC_IMPL.PORTFOLIO_TRANSFER_DOCUMENT_SAT': sats,
    };
};
