'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const ptItems = sinkExchange.resolveContext('ptItems');

    const link = ptItems.map(_ => ({
        PORTFOLIO_TRANSFER_NUMBER: sinkInput.ptNumber,
        CONTRACT_NUMBER: _.referenceNo,
        DUE_DATE: _.dueDate,
    }));

    const sat = ptItems.map(_ => ({
        PORTFOLIO_TRANSFER_NUMBER: sinkInput.ptNumber,
        CONTRACT_NUMBER: _.referenceNo,
        DUE_DATE: _.dueDate,
        START_DATE: _.startDate,
        HOLDER_NAME: _.holderName,
        PRODUCT_DESC: _.productDescription,
        CODE_NAME: _.configurationName,
        USERNAME: sinkInput.userName
    }));

    sat.push({
        PORTFOLIO_TRANSFER_NUMBER: sinkInput.ptNumber,
        $deleted: true,
    });

    return {
        'ACC_IMPL.PORTFOLIO_TRANSFER_ITEM_LINK': link,
        'ACC_IMPL.PORTFOLIO_TRANSFER_ITEM_SAT': sat
    };
};

