'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        claimId: input.id,
        claimNumber: input.number,
        contractNumber: input.body.mainAttributes.contract.number
    };
};
