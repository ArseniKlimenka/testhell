'use strict';
const { endowmentStates, endowmentTransitions } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, sinkExchange) {

    const endowments = input.endowments;
    const transitionName = input.transitionName;

    if (!endowments || endowments.length === 0) {

        return;
    }

    if (!endowments.every(doc => checkTransition(transitionName, doc.state)))
    {

        return;
    }

    const requestCollection = endowments.map(doc => {
        return {
            businessNumber: doc.number,
            transition: {
                transitionName: transitionName,
                configurationName: 'Endowment',
                configurationVersion: '1',
                skipIfNotAvailable: true
            }
        };
    });

    return requestCollection;
};

function checkTransition(transitionName, stateCode) {

    switch (transitionName) {
        case endowmentTransitions.deputyDirectorToSentToPayment:
            return stateCode === endowmentStates.deputyDirectorAproval;
        case endowmentTransitions.operationsToOperationsDirector:
            return stateCode === endowmentStates.operationsApproval;
        case endowmentTransitions.operationsDirectorToDeputyDirector:
            return stateCode === endowmentStates.operationsDirectorApproval;
        case endowmentTransitions.operationsDirectorToSentToPayment:
            return stateCode === endowmentStates.operationsDirectorApproval;
        default:
            return false;
    }
}
