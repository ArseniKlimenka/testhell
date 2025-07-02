"use strict";

module.exports = function mapping(input, sinkExchange) {

    const totalAmount = sinkExchange.totalAmount ?? 0;

    if (totalAmount > 0) {

        return {
            businessNumber: sinkExchange.amendmentNumber,
            transition: {
                transitionName: 'OperationsApproval_to_AwaitingPaymentDocuments',
                configurationName: sinkExchange.amendmentConfName,
                configurationVersion: '1',
                skipIfNotAvailable: false
            }
        };
    }

    return {
        businessNumber: sinkExchange.amendmentNumber,
        transition: {
            transitionName: 'OperationsApproval_to_Activated',
            configurationName: sinkExchange.amendmentConfName,
            configurationVersion: '1',
            skipIfNotAvailable: false
        }
    };
};
