'use strict';

const sendEventConstant = require('@config-rgsl/life-insurance/lib/sendEventConstant');
const { policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, sinkExchange) {

    let eventType;
    const targetStates = [policyState.CancelledByAmendment, policyState.Cancelled, policyState.Completed];

    if (targetStates.includes(input.state)) {
        eventType = sendEventConstant.eventType.SportsmanContractIsCancelledOrFinished;
    }

    sinkExchange.eventType = eventType;

    return {
        input: {
            data: {
                criteria: {
                    eventType: eventType
                }
            }
        }
    };

};
