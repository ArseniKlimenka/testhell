"use strict";

module.exports = function mapping(input, sinkExchange) {

    if (sinkExchange.hasActiveInquiries) {

        return;
    }

    return [
        {
            businessNumber: input.body.endowmentNumber,
            transition: {
                transitionName: 'AwaitingInquiries_to_OperationsApproval',
                configurationName: 'Endowment',
                configurationVersion: '1',
                skipIfNotAvailable: true
            }
        },
        {
            businessNumber: input.body.endowmentNumber,
            transition: {
                transitionName: 'AwaitingApproval_to_OperationsApproval',
                configurationName: 'Endowment',
                configurationVersion: '1',
                skipIfNotAvailable: true
            }
        }
    ];
};
