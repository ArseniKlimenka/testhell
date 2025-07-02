"use strict";

module.exports = function mapping(input, sinkExchange) {

    if (sinkExchange.hasActiveInquiries) {

        return;
    }

    return [
        {
            businessNumber: input.body.cancellationNumber,
            transition: {
                transitionName: 'RequestToClient_to_OperationsApproval',
                configurationName: input.body.configurationCodeName,
                configurationVersion: '1',
                skipIfNotAvailable: true
            }
        },
        {
            businessNumber: input.body.cancellationNumber,
            transition: {
                transitionName: 'AwaitingApproval_to_OperationsApproval',
                configurationName: input.body.configurationCodeName,
                configurationVersion: '1',
                skipIfNotAvailable: true
            }
        }
    ];
};
