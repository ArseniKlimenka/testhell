"use strict";

module.exports = function mapping(input, sinkExchange) {

    const sourceDocumentBody = sinkExchange.sourceBody;
    sourceDocumentBody.paymentOrderInformation.isCanelledNetting = true;

    return {
        body: sourceDocumentBody,
        number: input.currentPONumber
    };
};
